# Release strategy

Devicon does not follow a strict release plan. A new release is depended on current amount of contributions, required bugfixes/patches and will be discussed by the team of maintainers.

Generally speaking: A new release will be published when new icons are added or a bug was fixed. When it's predictable that multiple icons are added in a foreseeable amount of time they are usually wrapped together.

# Conventions

The version naming follows the rules of [Semantic Versioning](https://semver.org/). Given a version number MAJOR.MINOR.PATCH, increment the:

*   MAJOR version when you make incompatible API changes,
*   MINOR version when you add functionality **(like a new icon)** in a backwards compatible manner, and
*   PATCH version when you make backwards compatible bug fixes.

# Execution

1.  Define the next release version number based on the conventions
2.  Checkout `development` as `draft-release` branch
3.  Bump the package version using `npm version v_MAJOR_._MINOR_._PATCH_ -m "bump npm version to v_MAJOR_._MINOR_._PATCH_"` (see [#487](https://github.com/devicons/devicon/pull/497))
4.  Push the branch `draft-release`
5.  Manually trigger the workflow [`build_icons.yml`](https://github.com/devicons/devicon/actions/workflows/build_icons.yml) (which has a `workflow_dispatch` event trigger) and select the branch `draft-release` as target branch. This will build a font version of all icons using icomoon and automatically creates a pull request to merge the build result back into `draft-release`
6.  Review and approve the auto-create pull request created by the action of the step above
7.  Create a pull request towards `development`. Mention the release number in the pull request title (like "Build preparation for release v_MAJOR_._MINOR_._PATCH_).
    *   Add information about all new icons, fixes, features and enhancements in the description of the pull request.
    *   Take the PRs/commits as a guideline. It's also a good idea to mention and thank all contributions who participated in the release (take description of [#504](https://github.com/devicons/devicon/pull/504) as an example).
    *   We now have a script that will do this for us. Check the \`build-bot\`'s PR message in the last step. There should be a section where it displays the features that have been added to the release. You can copy the markdown there and use it for the release message.
8.  Wait for review and approval of the pull request (you can perform a squash-merge)
9.  Once merged create a pull request with BASE `master` and HEAD `development`. Copy the description of the earlier pull request.
10.  Since it was already approved in the 'development' stage a maintainer is allowed to merge it (**DON'T** perform a squash-merge).
11.  Create a [new release](https://github.com/devicons/devicon/releases/new) using the format "**Release v_MAJOR_._MINOR_._PATCH_**" as tag and release title. Use the earlier created description as description of the release.
12.  Publishing the release will trigger the [npm\_publish.yml](/.github/workflows/npm_publish.yml) workflow which will execute a `npm publish` leading to a updated [npm package](https://www.npmjs.com/package/devicon) (v_MAJOR_._MINOR_._PATCH_).