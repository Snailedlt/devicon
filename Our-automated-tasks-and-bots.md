We rely on GitHub Actions, Python, Selenium, Imgur, and Gulp to automate our tasks. Please feel free to take a look at the workflow files. The codes should be clear enough to follow along.

Here are the main bots/scripts that we use:

*   `peek-bot`: Upload the icons to Icomoon and see what it looks like. Doesn't download any icons at this time.
*   `build-bot`: Build the icons by uploading them to Icomoon and download the resulting icon files. This also includes updating the css file and optimize the SVGs by minifying them and prefixing their IDs with the file names.
*   `check-bot`: Check *only* the icon PRs and ensure they have the correct SVGs and `devicon.json` entry.
*   `npm-release-bot`: Update the NPM package.

Here are the modular tasks in the build script:

*   Upload SVGs to [icomoon.io](https://icomoon.io/app/#/select) and get the icons back. For details, see [the original disscussion](https://github.com/devicons/devicon/issues/252), [this PR that introduce the feature](https://github.com/devicons/devicon/pull/268) and [the final changes to it.](https://github.com/devicons/devicon/issues/300) Used by **peek-bot** and **build-bot**.
*   Preview what an SVG would look like as an icon using the upload svgs script (see [this](https://github.com/devicons/devicon/pull/412)). Used by **peek-bot**.
*   Build, combine, and minify CSS files. For details, see [this](https://github.com/devicons/devicon/pull/290). Used by **build-bot**.
*   Send screenshots to Imgur and upload it to a PR. See [the PR for the Imgur action](https://github.com/devicons/devicon/pull/398) and [the PR for uploading the pictures to a PR](https://github.com/devicons/devicon/pull/481). Used by **peek-bot** and **build-bot**.
*   Ensure code quality is up to standard
*   Comment on the PR so maintainers don't have to manually upload icon result. Used by **peek-bot** and **build-bot**.
*   Publishing a new release to [npm](https://www.npmjs.com/package/devicon); See [#288](https://github.com/devicons/devicon/issues/288)
*   Creating a list of features that was added since last release. See [this discussion](https://github.com/devicons/devicon/discussions/574) for inception and limitations.
*   Optimize the SVGs by minifying them and prefixing their IDs with the file names. This is done so using inline SVGs from this repository will not cause ID clash.