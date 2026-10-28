# Release strategy

Releases are automated. Every Monday at 2 AM UTC the [Weekly Build and Release](https://github.com/devicons/devicon/actions/workflows/build_weekly.yml) workflow builds the font for the icons merged since the last build and, if anything changed for users, prepares a release that a maintainer approves.

Everything is merged into `master`; there is no `develop` branch.

# Conventions

The version naming follows [Semantic Versioning](https://semver.org/). Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible changes **(like renaming or removing an icon)**,
* MINOR version when you add functionality **(like a new icon or an updated icon)** in a backwards compatible manner, and
* PATCH version when you make backwards compatible bug fixes **(like a corrected alias or tag)**.

The bump comes from the `release:` labels of the PRs merged since the last release:

| PR label | Bump |
|---|---|
| `release: major` | major |
| `release: minor` | minor |
| `release: patch` or no label | patch |

The check-bot labels icon PRs automatically (major for a renamed or removed icon, minor for a new or updated one). Maintainers can change the label before merging. Label other PRs (website, workflow features) yourself; a `release:` label also makes that PR trigger a release on its own.

# Execution

1. **Build** (automatic). The workflow builds font glyphs for new and changed icons through icomoon.io, rebuilds the CSS and `devicon.json`, and commits the result to `master` as `build: generate font files and CSS`. A failed icomoon.io build is retried twice; if it still fails, a `build-failed` issue is opened.
2. **Approve** (maintainer). If anything shipped changed since the last release (SVGs, `devicon.json`, CSS, fonts), or a merged PR has a `release:` label, the release job waits for approval on the `production` environment. Approve it in the workflow run to release, or reject it to skip this week.
3. **Release** (automatic). The workflow bumps the version, tags it, and creates the [GitHub release](https://github.com/devicons/devicon/releases) with notes listing the new/updated icons and other changes, thanking their authors.
4. **Publish** (automatic). The release is published to [npm](https://www.npmjs.com/package/devicon).

To release outside the weekly schedule, run the workflow manually (**Run workflow** on the [workflow page](https://github.com/devicons/devicon/actions/workflows/build_weekly.yml)). Its `bump` input (`auto`, `patch`, `minor`, `major`) overrides the labels.

If the icons fail to appear on the website after a release, clear the CDN cache with [this link](https://purge.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css).
