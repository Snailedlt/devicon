<p>Below is a summary of the icon creation and submission process:</p>
<ol>
  <li>Check that the icon is not in an open PR or already in the <a href="https://github.com/devicons/devicon/tree/master/icons"><code>master</code> branch</a>.</li>
  <li>Create the SVGs for each <a href="https://github.com/devicons/devicon/wiki/SVG-Versions">SVG version</a> that you have. Follow the <a href="https://github.com/devicons/devicon/wiki/SVG-Standards">standards</a> listed.</li>
  <li>Put the SVGs into the icon's own <a href="https://github.com/devicons/devicon/wiki/Organizing-SVGs">folder</a> in <code>/icons</code>.</li>
  <li><a href="https://github.com/devicons/devicon/wiki/Updating-%60devicon.json%60">Add the icon's data</a> in <code>icons/&lt;name&gt;/&lt;name&gt;.json</code>.</li>
  <li>Create a pull request (PR) towards the <code>master</code> branch.</li>
  <li>Look at the PR body and follow its instructions. Once you have the right template, fill out the information in it.</li>
  <li>Ensure your PR title is in this format: <code>new icon: <i>Icon name</i> (<i>versions</i>)</code>. If it isn't, the bot will fix it for you.</li>
  <li>A bot will check your PR to ensure it is up to standards. If there are any errors, please fix them as instructed.</li>
  <li>Once the bot is satisfied, wait for a maintainer to review your changes. They will run the <a href='https://github.com/devicons/devicon/wiki/Our-automated-tasks-and-bots'><code>peek-bot</code></a> to check your icons' font version.</li>
  <li>If everything is fine, they will merge it using <a href="https://www.shellhacks.com/git-squash-commits-merge-all-commits-in-branch-into-one/"><b>squash merging</b></a>. If there are any problems, they will work with you to fix them.</li>
</ol>

<i>Note</i>: Repeat this process for each icon that you have. For example: you have the icons for React, Vue, and Angular. Repeat the steps above (create a folder, open a PR) for React, Vue, and Angular individually, each in its own branch.

That's it! Your icon's font version is built in the next weekly build and shipped in the next release. Until then, you can use the SVG files.
