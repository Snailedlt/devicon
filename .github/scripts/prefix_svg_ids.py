import sys
from pathlib import Path

# pycharm complains that build_assets is an unresolved ref
# don't worry about it, the script still runs
from build_assets import util


def main():
    """
    Prefix the ids in the given SVG files with their file name, so they're
    unique across all icons (see util.prefix_svg_ids). Run by the weekly build
    on the SVGs merged since the last build, so contributors' branches never
    need to be edited.

    Usage: python prefix_svg_ids.py <svg file>...
    """
    for path in map(Path, sys.argv[1:]):
        if path.suffix != ".svg" or not path.is_file():
            continue
        # newline="" keeps the file's line endings as they are
        with open(path, encoding="utf-8", newline="") as f:
            svg = f.read()
        new = util.prefix_svg_ids(svg, path.stem)
        if new != svg:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new)
            print(f"Prefixed ids in {path}: {', '.join(util.get_unprefixed_svg_ids(svg, path.stem))}")


if __name__ == "__main__":
    main()
