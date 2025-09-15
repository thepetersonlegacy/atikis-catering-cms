const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'content', 'menu');
const out = path.join(__dirname, 'bad_menu_files.txt');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const bad = [];
for (const f of files) {
  const full = path.join(dir, f);
  const text = fs.readFileSync(full, 'utf8');
  if (!text.includes('content/menu-categories/')) bad.push(`content/menu/${f}`);
}
fs.writeFileSync(out, bad.join('\n') + (bad.length ? '\n' : ''));
console.log('Found', bad.length, 'bad files. Written to', out);

