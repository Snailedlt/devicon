There are some bugs that the automation might run into. Listed below are the common ones and their solutions

1.  **No connection could be made because the target machine actively refused it. (os error 10061)**
    *   See [this action](https://github.com/devicons/devicon/runs/2292634069?check_suite_focus=true) for an example.
    *   Caused by Selenium picking a random port to host their server and GitHub blocking it. This issue should be fixed in [#966](https://github.com/devicons/devicon/pull/966). It hasn't occur again after we picked 8080 as the port for Selenium to use.
    *   Solution: if it one day breaks, wait for 10 minutes and rerun the script. Repeat until it works.
2.  **SHA Integrity**
    *   See [this action](https://github.com/devicons/devicon/runs/2310036084?check_suite_focus=true) for an example.
    *   Caused by the `package-lock.json`. Most likely the result of a dependabot update but not 100% sure.
    *   Solution: Remove the `package-lock.json` and run \`npm install\` to generate a new file. Commit and push.
3.  **Wrong PR Title**
    *   The `bot-peek` script relies on the PR title to find the icon that was added in the PR. If the format doesn't match what is specified in [Overview on Submitting Icon](#overview), the bot will fail.
    *   Solution: Ensure the name of the PR follows the convention.
4.  **Icon created by Icomoon contains strange lines that aren't in the SVG**
    *   See [this PR](https://github.com/devicons/devicon/pull/532)'s peek result.
    *   This is caused by a bug in Icomoon's parser (see [this](https://github.com/devicons/devicon/pull/532#issuecomment-827180766)).
    *   Solution: Luckily this is an extremely rare case. Try remaking the SVG in a different way (using different paths/shapes). If your text/paths are joined with another object (say, the logo), try splitting them into individual paths (see [this PR](https://github.com/devicons/devicon/pull/816#issuecomment-904021383)). You can always test using Icomoon to see if your fix works.