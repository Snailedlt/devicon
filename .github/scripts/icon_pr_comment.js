// Builds the one bot comment on icon PRs (check result + peek result), used by
// post_icon_pr_comment.yml. The comment is found by MARKER and edited in place,
// so GitHub's edit history shows earlier results.
const MARKER = '<!-- devicon-bot -->';
const TITLE_START = '<!-- devicon-bot:title -->', TITLE_END = '<!-- /devicon-bot:title -->';
const GUIDE = 'https://github.com/devicons/devicon/wiki/SVG-Standards';
// The texts come from the PR (title, artifacts): keep them inside their code blocks
const fence = t => String(t).replace(/```/g, "'''");
const code = t => String(t).replace(/[`\r\n]/g, "'");

// check: { errors, expectedTitle, renamed, oldTitle, failedWithoutDetails, checkUrl }
function checkSection(c) {
  const out = ['### Check', ''];
  if (c.failedWithoutDetails) {
    out.push(`The check failed without details: see the [check run](${c.checkUrl}). A common cause is a PR that doesn't target \`master\`.`);
  } else if (c.errors) {
    out.push('Some things need fixing:', '', '```', fence(c.errors), '```', '',
      `See the [SVG standards](${GUIDE}) for details. Push new commits or edit the PR title and I'll check again.`);
  } else if (c.expectedTitle && !c.renamed) {
    // Without the bot app a rename wouldn't re-run the check, so ask instead
    out.push("The icons look good, but the PR title doesn't match the icon this PR changes. Please rename it to:", '',
      '```', fence(c.expectedTitle), '```');
  } else if (c.expectedTitle) {
    out.push("The PR title didn't match the icon this PR changes, so I renamed it (see below). I'll check again with the new title.");
  } else {
    out.push(':white_check_mark: No issues found.');
  }
  return out;
}

// A rename note stays in the comment after the re-check, until the next rename
function titleSection(c, prevBody) {
  if (c.renamed && c.expectedTitle) {
    return [TITLE_START, '',
      `**Title:** I renamed this PR from \`${code(c.oldTitle)}\` to \`${code(c.expectedTitle)}\`. The title becomes the commit message and the line in the release notes.`,
      TITLE_END];
  }
  const i = prevBody ? prevBody.indexOf(TITLE_START) : -1, j = prevBody ? prevBody.indexOf(TITLE_END) : -1;
  return i >= 0 && j > i ? [prevBody.slice(i, j + TITLE_END.length)] : [];
}

// peek: { status: 'success'|'failure'|'no-svg'|'none', checkPassed, files, baseUrl, error, uploadFailed }
function peekSection(p) {
  const out = ['### Peek', ''];
  if (p.status === 'success' && p.uploadFailed) {
    out.push("I peeked at the icons but couldn't post the screenshots. The maintainers will look into it.");
  } else if (p.status === 'success' && p.files.length) {
    const group = prefix => p.files.filter(f => f.startsWith(prefix)).map(f => `![${f}](${p.baseUrl}/${f})`).join('  \n') || '_not generated_';
    out.push("I peeked at the icons using [icomoon.io](https://icomoon.io/app/#/select).", '',
      '**As SVGs:**', group('new_svg_'), '',
      '**As font icons:**', group('new_icon_'), '',
      '**Coloured:**', group('new_colored_icon_'), '');
    if (p.error) out.push('```', fence(p.error), '```', '');
    out.push('The maintainers will check that:',
      '1. The number of glyphs matches the number of font versions.',
      '2. The font icons look the same as the SVGs.',
      '3. The icons are of high quality (legible, match the official logo, etc.).', '',
      "Font issues are often caused by strokes, which icomoon ignores. See icomoon's [docs](https://icomoon.io/#faq/importing).");
  } else if (p.status === 'success') {
    out.push('No icon SVGs changed, so there was nothing to peek at.');
  } else if (p.status === 'failure') {
    out.push("I couldn't peek at the icons:", '', '```', fence(p.error || 'Unknown error'), '```', '',
      'Make sure the SVGs are [named and placed correctly](https://github.com/devicons/devicon/wiki/Organizing-SVGs) and the icon is in [`devicon.json`](https://github.com/devicons/devicon/wiki/Updating-%60devicon.json%60). I\'ll try again on the next push.');
  } else if (p.status === 'no-svg') {
    out.push('No icon SVGs changed, so there was nothing to peek at.');
  } else if (!p.checkPassed) {
    out.push(':hourglass: Waiting for the check to pass. A maintainer can add the `bot:peek` label to peek anyway.');
  } else {
    out.push("The peek didn't run. The maintainers will look into it.");
  }
  return out;
}

function buildBody({ check, peek, prevBody, sha, runUrl, workflowError }) {
  return [MARKER,
    "Hi! I'm Devicon's bot. I check icon PRs and peek at the icons as font glyphs. I update this comment on every check; its edit history shows earlier results.", '',
    ...checkSection(check), '',
    ...titleSection(check, prevBody), '',
    ...peekSection(peek), '',
    ...(workflowError ? [`:warning: Something went wrong while posting these results ([workflow run](${runUrl})). The maintainers will look into it.`, ''] : []),
    '---',
    `<sub>Checked commit ${sha.slice(0, 7)} · [workflow run](${runUrl}) · Thanks for contributing to Devicon!</sub>`,
  ].join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

// Only the bot's own comment: anyone can paste the marker into a comment
async function findComment(github, issue) {
  const comments = await github.paginate(github.rest.issues.listComments, { ...issue, per_page: 100 });
  return comments.find(c => c.user && c.user.login === 'github-actions[bot]' && c.body && c.body.startsWith(MARKER));
}

module.exports = { MARKER, buildBody, findComment };
