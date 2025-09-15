const fs = require('fs');
const path = require('path');
const ITEMS_DIR = path.join(__dirname, '..', 'content', 'menu');
const CAT_DIR = path.join(__dirname, '..', 'content', 'menu-categories');
const REPORT = path.join(__dirname, 'verify-report.txt');

function main() {
  const cats = new Set(fs.readdirSync(CAT_DIR).filter(f=>f.endsWith('.json')).map(f=>`content/menu-categories/${f}`));
  const files = fs.readdirSync(ITEMS_DIR).filter(f=>f.endsWith('.json'));
  let ok=0, bad=0;
  const issues=[];
  for (const f of files) {
    const full = path.join(ITEMS_DIR, f);
    try {
      const data = JSON.parse(fs.readFileSync(full,'utf8'));
      const cat = data.category;
      if (typeof cat==='string' && cats.has(cat)) ok++; else { bad++; issues.push(`${f}: category=${JSON.stringify(cat)}`); }
    } catch(e){ bad++; issues.push(`${f}: ERROR ${e.message}`); }
  }
  const out = [`Checked ${files.length} menu files`, `OK: ${ok}`, `BAD: ${bad}`, '', ...issues];
  fs.writeFileSync(REPORT, out.join('\n')+'\n');
  console.log('Report written to', REPORT);
}

main();

