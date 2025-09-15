/*
  Normalize Tina menuItems category references by using authoritative mapping
  from lib/data/menu-data.ts (by matching on item name/title).

  Usage:
    node scripts/fix-menu-category-references.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, '..', 'lib', 'data', 'menu-data.ts');
const ITEMS_DIR = path.join(__dirname, '..', 'content', 'menu');
const CAT_DIR = path.join(__dirname, '..', 'content', 'menu-categories');

function slugify(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractArrayLiteral(tsSource) {
  const match = tsSource.match(/export\s+const\s+allMenuItems[\s\S]*?=\s*(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Could not locate allMenuItems array in lib/data/menu-data.ts');
  return match[1];
}

function evaluateArray(arrayCode) {
  const context = {};
  vm.createContext(context);
  const script = new vm.Script('(' + arrayCode + ')');
  const result = script.runInContext(context, { timeout: 5000 });
  if (!Array.isArray(result)) throw new Error('Evaluated value is not an array');
  return result;
}

function loadAuthoritativeMap() {
  const srcText = fs.readFileSync(SRC, 'utf8');
  const arrayLiteral = extractArrayLiteral(srcText);
  const items = evaluateArray(arrayLiteral);
  const byName = new Map();
  for (const it of items) {
    const name = it.title || it.name;
    if (name) byName.set(name.trim().toLowerCase(), it.category);
  }
  return byName;
}

function categoryPathFor(name) {
  const slug = slugify(name);
  return `content/menu-categories/${slug}.json`;
}

(function main() {
  const mapByName = loadAuthoritativeMap();

  const files = fs.readdirSync(ITEMS_DIR).filter(f => f.endsWith('.json'));
  let fixed = 0, skipped = 0;
  for (const file of files) {
    const full = path.join(ITEMS_DIR, file);
    try {
      const data = JSON.parse(fs.readFileSync(full, 'utf8'));
      const current = data.category;
      if (typeof current === 'string' && current.startsWith('content/menu-categories/')) {
        skipped++;
        continue; // already a reference
      }
      const key = (data.name || '').trim().toLowerCase();
      const catName = key && mapByName.get(key);
      if (catName) {
        data.category = categoryPathFor(catName);
        fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n', 'utf8');
        fixed++;
      } else {
        // Try a fallback on existing readable category if it matches an existing category file
        if (typeof current === 'string' && current.trim()) {
          const guess = path.join(CAT_DIR, slugify(current.trim()) + '.json');
          if (fs.existsSync(guess)) {
            data.category = `content/menu-categories/${slugify(current.trim())}.json`;
            fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n', 'utf8');
            fixed++;
            continue;
          }
        }
        skipped++;
      }
    } catch (e) {
      console.error('Failed to process', file, e.message);
    }
  }
  console.log(`Category normalization done. Fixed: ${fixed}, Unchanged: ${skipped}, Total: ${files.length}`);
})();

