from pathlib import Path
import re
from typing import List, Tuple
import sys
import traceback
import json
import subprocess
from io import FileIO

def exit_with_err(err: Exception, logfile: FileIO=None):
    """
    Exit the current step and display the err.
    :param: err, the error/exception encountered.
    """
    if logfile:
        traceback.print_exc(file=logfile)
    else:
        traceback.print_exc()
    sys.exit(1)


def load_icons(icons_folder_path: str="icons") -> List[dict]:
    """
    Read each icon's data from icons/<name>/<name>.json. The icon's name is its
    folder name; the root devicon.json is generated from these files (see
    .github/scripts/devicon_json.js).
    :return the icons as devicon.json entries ({"name": ..., "altnames": ...}),
    sorted by name.
    :raise ValueError if a data file isn't a valid JSON object.
    """
    icons = []
    for folder in sorted(Path(icons_folder_path).iterdir()):
        data_file = folder / f"{folder.name}.json"
        if not data_file.is_file():
            continue
        try:
            data = json.loads(data_file.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            raise ValueError(f"`icons/{folder.name}/{folder.name}.json` is not valid JSON: {e}")
        if type(data) != dict:
            raise ValueError(f"`icons/{folder.name}/{folder.name}.json` must contain a JSON object.")
        # The folder decides the name; a "name" in the file is flagged by the check-bot
        icons.append({"name": folder.name, **{k: v for k, v in data.items() if k != "name"}})
    return icons


def get_pr_icon_changes(base: str="HEAD^1"):
    """
    Find out which icons a PR touches by diffing against `base`. In a PR's
    merge commit (what actions/checkout checks out), HEAD^1 is the target branch.
    :param base, the commit to compare against.
    :return a dict with:
        "svgs": {icon folder name: [SVG file names added/modified]}
        "icon_folders": sorted names of the icons/<name>/ folders with any change
            (added, modified or deleted files, including the icon's data file)
        "other_files": changed paths outside icons/<name>/ (except devicon.json)
        "json": names of icons whose icons/<name>/<name>.json was added, changed or removed
        "existing": names of the icons that had a data file at `base`
        "devicon_json": whether the generated root devicon.json was edited
    """
    # -z: NUL-separated "status, path" pairs, so unusual file names parse safely.
    # --no-renames: a rename shows up as a delete + add, so both paths count.
    out = subprocess.run(
        ["git", "diff", "--name-status", "-z", "--no-renames", base, "HEAD"],
        capture_output=True, text=True, check=True).stdout.split("\0")
    svgs, icon_folders, other_files, changed_json, devicon_json = {}, set(), [], set(), False
    for status, path in zip(out[0::2], out[1::2]):
        if path == "devicon.json":
            devicon_json = True
            continue
        parts = path.split("/")  # icons/<name>/<file>
        if len(parts) == 3 and parts[0] == "icons":
            icon_folders.add(parts[1])
            if parts[2] == f"{parts[1]}.json":
                changed_json.add(parts[1])
            elif status != "D" and parts[2].endswith(".svg"):
                svgs.setdefault(parts[1], []).append(parts[2])
        else:
            other_files.append(path)

    base_files = subprocess.run(["git", "ls-tree", "-r", "--name-only", base, "--", "icons"],
        capture_output=True, text=True, check=True).stdout.splitlines()
    existing = {p.split("/")[1] for p in base_files if p.count("/") == 2 and p.endswith(f"/{p.split('/')[1]}.json")}

    return {"svgs": svgs, "icon_folders": sorted(icon_folders), "other_files": other_files,
            "json": sorted(changed_json), "existing": existing, "devicon_json": devicon_json}


def get_devicon_json_edits(base: str="HEAD^1") -> Tuple[List[dict], List[str]]:
    """
    The entries a PR added or changed in the generated root devicon.json, so the
    check-bot can show contributors what to put in icons/<name>/<name>.json.
    :return (added/changed entries, names of removed entries).
    """
    def read(rev):
        try:
            return {i["name"]: i for i in json.loads(subprocess.run(["git", "show", f"{rev}:devicon.json"],
                capture_output=True, text=True, check=True).stdout)}
        except (subprocess.CalledProcessError, json.JSONDecodeError, KeyError, TypeError):
            return {}
    before, after = read(base), read("HEAD")
    return [i for n, i in after.items() if before.get(n) != i], [n for n in before if n not in after]


def get_svg_versions(icon: dict, svg_files: List[str]) -> Tuple[List[str], List[str]]:
    """
    Get the versions of the given SVG files of an icon.
    :param icon, the icon's data (a devicon.json entry).
    :param svg_files, SVG file names in the icon's folder.
    :return (versions, invalid file names). Versions are ordered like
    versions.svg in devicon.json.
    """
    versions, invalid = [], []
    for file in svg_files:
        stem = Path(file).stem
        version = stem[len(icon["name"]) + 1:]
        if stem.startswith(icon["name"] + "-") and is_svg_version_valid(version):
            versions.append(version)
        else:
            invalid.append(file)

    order = icon["versions"]["svg"]
    versions.sort(key=lambda v: (order.index(v) if v in order else len(order), v))
    return versions, invalid


pr_title_pattern = re.compile(r"^(new|update) icon:\s*([\w.-]+)\s*\(([^)]*)\)\s*$", re.I)
def check_pr_title(pr_title: str, icon: dict, is_new: bool, versions: List[str]):
    """
    Check that an icon PR's title is `new icon: <name> (<versions>)` or
    `update icon: <name> (<versions>)`, matching what the PR actually does.
    :param pr_title, the PR title.
    :param icon, the data of the icon whose SVGs the PR changes.
    :param is_new, whether the icon is new (no data file in the target branch).
    :param versions, the SVG versions the PR adds/changes.
    :return (problems, expected title): problems is a string with the issues and
    the expected title, or "" if the title is fine.
    """
    kind = "new" if is_new else "update"
    expected = f"{kind} icon: {icon['name']} ({', '.join(versions)})"

    problems = []
    match = pr_title_pattern.match(pr_title.strip())
    if not match:
        problems.append("it doesn't follow the format `new icon: <name> (<versions>)` or `update icon: <name> (<versions>)`")
    else:
        title_kind, title_name = match.group(1).lower(), match.group(2).lower()
        title_versions = {v.strip().lower() for v in match.group(3).split(",") if v.strip()}
        if title_kind != kind:
            what = "adds a new icon" if is_new else "updates an existing icon"
            problems.append(f"this PR {what}, so the title should start with `{kind} icon:`")
        if title_name != icon["name"]:
            problems.append(f"the icon name should be `{icon['name']}` (the folder name), not `{title_name}`")
        if title_versions != set(versions):
            verb = "adds" if is_new else "changes"
            problems.append(f"the versions should be the SVGs this PR {verb}: {', '.join(versions)}")

    if problems:
        return "PR title issues:\n" + "\n".join(f"- {p}" for p in problems) + f"\n\nExpected title:\n{expected}", expected
    return "", expected


def is_svg_in_font_attribute(svg_file_path: Path, devicon_object: dict): 
    """
    Check if svg is in devicon.json's font attribute.
    :param svg_file_path, the path to a single svg icon
    :devicon_object, an object for a single icon inside devicon.json
    :return true if the svg exists in the devicon_object's font attribute, false if it doesn't
    """
    icon_version = Path(svg_file_path).stem.split('-', 1)[1]
    font_object = devicon_object["versions"]["font"]
    return icon_version in font_object


valid_svg_filename_pattern = re.compile(r"-(original|plain|line)(-wordmark)?\.svg$")
def is_svg_name_valid(filename: str):
    return valid_svg_filename_pattern.search(filename) is not None


valid_svg_version_pattern = re.compile(r"^(original|plain|line)(-wordmark)?$")
def is_svg_version_valid(version):
    return valid_svg_version_pattern.search(version) is not None
