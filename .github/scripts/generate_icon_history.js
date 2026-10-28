/*
 * Generates devicon-history.json, used by the website to sort icons by release
 * date and last update. For every icon (icons/<name>/<name>.json) it records:
 * - released / releasedOn: the first release (v* tag) that contained the icon
 * - updated / updatedOn:   the release of the icon's last real change
 *
 * "Real" changes are changes to the icon's SVGs, ignoring build commits (they
 * only re-optimize SVGs) and bulk commits touching more than BULK_LIMIT icons
 * (e.g. repo-wide SVG optimizations). Data-only changes (tags, altnames) don't
 * count as updates.
 * Icons that aren't in any release yet get --next-version (the release being
 * made) and today's date.
 *
 * Usage: node .github/scripts/generate_icon_history.js [--next-version v1.2.3]
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const { loadIcons } = require('./devicon_json');

const BULK_LIMIT = 5;
const BUILD_COMMIT = /^(build|built|build preparation)\b/i;

const git = (...args) => execFileSync('git', args, { maxBuffer: 1 << 30 }).toString();
const lines = text => text.split('\n').filter(Boolean);

// Dates are full UTC timestamps, so releases made on the same day still sort
const utc = date => new Date(date).toISOString().replace(/\.\d+Z$/, 'Z');

const nextIndex = process.argv.indexOf('--next-version');
const next = nextIndex > -1 ? { tag: process.argv[nextIndex + 1], date: utc(Date.now()) } : null;

// Releases in this branch's history, oldest first (old ones are tagged v1.0 … v2.7,
// newer ones v2.8.0 …). Tags on other branches (e.g. the old develop) would
// otherwise date icons by releases that never contained them.
const releases = lines(git('for-each-ref', '--sort=version:refname',
  '--merged', 'HEAD', '--format=%(refname:short) %(creatordate:iso-strict)', 'refs/tags/v*'))
  .map(line => { const [tag, date] = line.split(' '); return { tag, date: utc(date) }; })
  .filter(r => /^v\d+\.\d+(\.\d+)?$/.test(r.tag));

// Which release first contained each commit and each icon folder
const releaseOfCommit = new Map();
const firstRelease = new Map();
releases.forEach((release, i) => {
  const previous = releases.slice(0, i).map(r => r.tag);
  for (const sha of lines(git('rev-list', release.tag, ...(previous.length ? ['--not', ...previous] : [])))) {
    releaseOfCommit.set(sha, release);
  }
  for (const path of lines(git('ls-tree', '--name-only', `${release.tag}:icons`))) {
    if (!firstRelease.has(path)) firstRelease.set(path, release);
  }
});

// Last real change per icon folder (git log lists newest first)
const lastChange = new Map();
const log = git('log', '--format=%x00%H %s', '--name-only', '--', 'icons');
for (const entry of log.split('\0').filter(Boolean)) {
  const [header, ...paths] = lines(entry);
  const [sha, ...subject] = header.split(' ');
  const folders = new Set(paths.filter(p => p.endsWith('.svg')).map(p => p.split('/')[1]));
  if (folders.size > BULK_LIMIT || BUILD_COMMIT.test(subject.join(' '))) continue;
  for (const folder of folders) {
    if (!lastChange.has(folder)) lastChange.set(folder, sha);
  }
}

// Position in the release list; the upcoming release (not tagged yet) comes last
const releaseIndex = release => {
  const i = releases.findIndex(r => r.tag === release.tag);
  return i === -1 ? Infinity : i;
};
const history = {};
for (const { name } of loadIcons()) {
  const released = firstRelease.get(name) || next;
  if (!released) continue;
  let updated = lastChange.has(name) ? (releaseOfCommit.get(lastChange.get(name)) || next) : released;
  // A change can't predate the first release containing the icon
  if (!updated || releaseIndex(updated) < releaseIndex(released)) updated = released;
  history[name] = { released: released.tag, releasedOn: released.date, updated: updated.tag, updatedOn: updated.date };
}

// One icon per line keeps the diffs readable
const body = Object.keys(history).sort()
  .map(name => `  ${JSON.stringify(name)}: ${JSON.stringify(history[name])}`).join(',\n');
fs.writeFileSync('devicon-history.json', `{\n${body}\n}\n`);
console.log(`Wrote history for ${Object.keys(history).length} icons (${releases.length} releases${next ? `, next: ${next.tag}` : ''})`);
