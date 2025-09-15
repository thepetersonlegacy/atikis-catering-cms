/*
  One-time importer: Generate Tina menuItems JSON files from lib/data/menu-data.ts

  Usage:
    node scripts/extract-menu-to-tina.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, '..', 'lib', 'data', 'menu-data.ts');
const OUT_DIR = path.join(__dirname, '..', 'content', 'menu');
const CAT_DIR = path.join(__dirname, '..', 'content', 'menu-categories');

function extractArrayLiteral(tsSource) {
  // Grab the array literal assigned to allMenuItems
  const match = tsSource.match(/export\s+const\s+allMenuItems[\s\S]*?=\s*(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Could not locate allMenuItems array in lib/data/menu-data.ts');
  return match[1];
}

function evaluateArray(arrayCode) {
  // Evaluate the array literal safely in a clean context
  const context = {};
  vm.createContext(context);
  const script = new vm.Script('(' + arrayCode + ')');
  const result = script.runInContext(context, { timeout: 5000 });
  if (!Array.isArray(result)) throw new Error('Evaluated value is not an array');
  return result;
}

function slugify(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTinaMenuJson(item, catPath) {
  const doc = {
    name: item.title || item.name || '',
    description: item.description || '',
    category: catPath || item.category || '',
  };
  if (item.image) doc.image = item.image;
  if (typeof item.boxMaxItemsPerBox === 'number') doc.boxMaxItemsPerBox = item.boxMaxItemsPerBox;
  if (Array.isArray(item.sections)) {
    doc.sections = item.sections.map(s => ({
      title: s.title || '',
      items: Array.isArray(s.items) ? s.items : [],
    }));
  }
  return doc;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

(function main() {
  try {
    console.log('[importer] reading source', SRC);
    const srcText = fs.readFileSync(SRC, 'utf8');
    console.log('[importer] source length', srcText.length);
    const arrayLiteral = extractArrayLiteral(srcText);
    console.log('[importer] extracted array length', arrayLiteral.length);
    const items = evaluateArray(arrayLiteral);
    console.log('[importer] items parsed', items.length);

    ensureDir(OUT_DIR);
    ensureDir(CAT_DIR);

    // Build categories from items
    const categories = Array.from(new Set(items.map(i => i.category).filter(Boolean)));
    const slugMap = new Map();
    categories.forEach((name, idx) => {
      const slug = slugify(name);
      slugMap.set(name, slug);
      const catPath = path.join(CAT_DIR, `${slug}.json`);
      if (!fs.existsSync(catPath)) {
        writeJson(catPath, { name, order: idx + 1 });
      }
    });

    let created = 0;
    for (const item of items) {
      const id = item.id || slugify(item.title || '');
      if (!id) continue;
      const outPath = path.join(OUT_DIR, `${id}.json`);
      const catSlug = slugMap.get(item.category || '');
      const catRef = catSlug ? `content/menu-categories/${catSlug}.json` : undefined;
      const data = toTinaMenuJson(item, catRef);
      writeJson(outPath, data);
      created++;
    }

    console.log(`Generated ${created} menu item files in content/menu and ${categories.length} categories in content/menu-categories`);
  } catch (err) {
    console.error('[importer] error:', err && err.stack || err);
    process.exit(1);
  }
})();

