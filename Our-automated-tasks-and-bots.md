We rely on GitHub Actions, Python, Selenium, Imgur, and Gulp to automate our tasks. Feel free to look at the [workflow files](https://github.com/devicons/devicon/tree/master/.github/workflows).

## On pull requests

### `check-bot`

Checks icon PRs (any change in `icons/`): one icon per PR, only files in `icons/<name>/`, valid SVG names and standards, the icon's data, and the PR title (`new icon: <name> (<versions>)` or `update icon: <name> (<versions>)`). It comments any problems, fixes a wrong title by itself when that's the only problem, and adds a `release:` label (see [Release strategy](https://github.com/devicons/devicon/wiki/Release-strategy,-conventions,-preparation-and-execution)).

### `peek-bot`

Uploads the PR's icons to [icomoon.io](https://icomoon.io/app/#/select) and comments screenshots of how they look as font glyphs. Maintainers start it with the `bot:peek` label.

### PR title check

Every PR's title must be `new icon: …`, `update icon: …`, or a [conventional commit](https://www.conventionalcommits.org/) title like `fix: correct the jekyll wordmark`, because PRs are squash-merged and the title becomes the commit message and the line in the release notes. Editing the title re-runs the check.

## Every week

### Weekly Build and Release

Builds the font glyphs for new and changed icons through icomoon.io (retried twice if it fails), rebuilds `devicon.min.css` and `devicon.json`, and commits them to `master`. Then, after a maintainer's approval, it bumps the version, creates the GitHub release with notes, and publishes to [npm](https://www.npmjs.com/package/devicon). See [Release strategy](https://github.com/devicons/devicon/wiki/Release-strategy,-conventions,-preparation-and-execution).

## Background

- Uploading SVGs to icomoon.io and getting the icons back: [the original discussion](https://github.com/devicons/devicon/issues/252), [the PR that introduced it](https://github.com/devicons/devicon/pull/268) and [the final changes](https://github.com/devicons/devicon/issues/300).
- Previewing SVGs as icons: [#412](https://github.com/devicons/devicon/pull/412).
- Building the CSS: [#290](https://github.com/devicons/devicon/pull/290).
- Uploading screenshots to Imgur and PRs: [#398](https://github.com/devicons/devicon/pull/398), [#481](https://github.com/devicons/devicon/pull/481).
- Release notes: [discussion #574](https://github.com/devicons/devicon/discussions/574).
- SVG ids are prefixed with the file name, so inline SVGs from this repository don't clash.
