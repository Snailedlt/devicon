<p>Below is a summary of the icon creation and submission process:</p>
<ol>
  <li>Create the SVGs for each <a href="#versionNaming">SVG versions</a> that you have. Follow the <a href="#SVGStandards">standards</a> listed.</li>
  <li>Put the SVGs of Devicon into its own <a href="#orgGuidelines">folder</a> in <code>/icons</code>.</li>
  <li><a href="#updateDevicon">Update the <code>devicon.json</code> to include the entry for a new icon</a>. </li>
  <li>Create a pull request (PR) towards the <code>develop</code> branch.</li>
  <li>Fill out the info as stated in the PR template.</li>
  <li>Ensure your PR title is in this format: <code>new icon: <i>Icon name</i> (<i>versions</i>)</code> </li>
  <li>A bot will check your PR to ensure they are up to standards. If there are any errors, please fix them as instructed.</li>
  <li>Once the bot is satisfied, wait for a maintainer to review your changes. They will run the <a href='#peekBot'><code>peek-bot</code></a> to check your icons' font version.</li>
  <li>If everything is fine, they will merge it using <a href="https://www.shellhacks.com/git-squash-commits-merge-all-commits-in-branch-into-one/"><b>squash merging</b></a>. If there are any problems, they will work with you to fix them.</li>
</ol>

<i>Note</i>: Repeat this process for each set of Icons that you have. For example: you have the icons for React, Vue, and Angular. Repeat the above step (create a folder, open a PR) for React, Vue, and Angular individually in their own branch.

That's it! Your icon will be generated into a font during the next release. Until then, you can use the SVG files.