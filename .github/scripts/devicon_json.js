/*
 * Each icon's data lives next to its SVGs in icons/<name>/<name>.json; the
 * icon's name is its folder name. The root devicon.json (what the website, npm
 * and jsDelivr users read) is generated from those files, sorted by name, by
 * the weekly build, so it always matches the fonts and CSS of the same commit.
 *
 * Usage: node .github/scripts/devicon_json.js   (writes ./devicon.json)
 */
const fs = require('fs');
const path = require('path');

// Key order of the generated entries, as in the hand-written devicon.json
const KEYS = ['altnames', 'tags', 'versions', 'color', 'aliases'];

/**
 * Read every icons/<name>/<name>.json under `root`.
 * @return the icons as devicon.json entries ({ name, altnames, ... }), sorted by name.
 */
function loadIcons(root = '.') {
  const iconsDir = path.join(root, 'icons');
  return fs.readdirSync(iconsDir).sort().flatMap(name => {
    const file = path.join(iconsDir, name, `${name}.json`);
    if (!fs.existsSync(file)) return [];
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      throw new Error(`icons/${name}/${name}.json is not valid JSON: ${e.message}`);
    }
    const entry = { name };
    for (const key of KEYS) entry[key] = data[key];
    return [entry];
  });
}

/** The devicon.json text for the given icons (4-space indent, trailing newline). */
const format = icons => JSON.stringify(icons, null, 4) + '\n';

/** Regenerate `root`/devicon.json. */
function writeDeviconJson(root = '.') {
  const icons = loadIcons(root);
  fs.writeFileSync(path.join(root, 'devicon.json'), format(icons));
  return icons.length;
}

module.exports = { loadIcons, format, writeDeviconJson, KEYS };

if (require.main === module) {
  console.log(`Wrote devicon.json with ${writeDeviconJson()} icons`);
}
