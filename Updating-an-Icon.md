# Updating an Icon

Sometimes a company updates its logo, or someone spots an error in an SVG or font icon, so the icon in our repository needs an update. Icon updates are always accepted, even for icons that wouldn't meet today's [criteria](https://github.com/devicons/devicon/wiki/What-Icons-Do-We-Accept%3F).

1. Update the SVGs in the icon's folder (`icons/<icon name>/`). Keep the existing file names, and follow the [SVG Standards](https://github.com/devicons/devicon/wiki/SVG-Standards) and [SVG Versions](https://github.com/devicons/devicon/wiki/SVG-Versions).
2. If you add or remove versions, update the icon's entry in `devicon.json` as well (see [Updating `devicon.json`](https://github.com/devicons/devicon/wiki/Updating-%60devicon.json%60)).
3. Only change one icon per pull request.
4. Name the pull request `update icon: <icon name> (<versions>)`, listing the versions you changed, e.g. `update icon: haxe (plain)`.
5. Follow the rest of the steps in [Overview on Submitting Icons](https://github.com/devicons/devicon/wiki/Overview-on-Submitting-Icons).

Renaming an icon or removing one of its versions is a breaking change for people who use it, so mention it clearly in your pull request.
