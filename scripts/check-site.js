// Static-site self check: JS syntax + internal link integrity.
// Run: node scripts/check-site.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let bad = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) checkHtml(full);
  }
}

function checkHtml(file) {
  const src = fs.readFileSync(file, 'utf8');
  const scripts = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  scripts.forEach((m, i) => {
    try {
      new Function(m[1]);
    } catch (err) {
      bad += 1;
      console.log('SYNTAX ERROR', path.relative(root, file), 'script #' + i, '-', err.message);
    }
  });
  const links = [...src.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const link of links) {
    if (link.startsWith('http')) continue;
    const target = path.join(root, link.slice(1));
    if (!fs.existsSync(target)) {
      bad += 1;
      console.log('BROKEN LINK', path.relative(root, file), '->', link);
    }
  }
}

walk(root);
console.log(bad === 0 ? 'ALL CHECKS PASSED' : bad + ' issue(s) found');
process.exit(bad === 0 ? 0 : 1);
