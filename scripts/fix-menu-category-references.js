/*
  Normalize Tina menuItems category references by using authoritative mapping
  from lib/data/menu-data.ts (by matching on item name/title) and heuristics.

  Usage:
    node scripts/fix-menu-category-references.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, '..', 'lib', 'data', 'menu-data.ts');
const ITEMS_DIR = path.join(__dirname, '..', 'content', 'menu');
const CAT_DIR = path.join(__dirname, '..', 'content', 'menu-categories');
const LOG = path.join(__dirname, 'normalized-log.txt');

function log(line) {
  fs.appendFileSync(LOG, line + '\n');
}

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

function loadValidCategories() {
  const cats = fs.readdirSync(CAT_DIR).filter(f => f.endsWith('.json'));
  const bySlug = new Set(cats);
  return {
    bySlug,
    hasName: (name) => bySlug.has(slugify(name) + '.json'),
  };
}

function heuristicCategoryFor(itemName) {
  const n = (itemName || '').toLowerCase();
  if (!n) return null;
  // Breakfast
  if (/breakfast|bagel|toast|oatmeal|omelet|frittata|quiche|granola|yogurt/.test(n)) {
    return 'Signature Breakfast Collection';
  }
  // Desserts
  if (/dessert|cookie|brownie|cake|mousse|cheesecake|confection|mini-dessert/.test(n)) {
    return 'Elegant Desserts and Confections';
  }
  // Salads / Bowls
  if (/salad|bowl|buddha|nicoise|caesar|arugula|greens/.test(n)) {
    return 'Artisan Salad and Grain Bowls';
  }
  // Plant-based
  if (/vegan|tofu|plant/.test(n)) {
    return 'Plant-Based Culinary Selections';
  }
  // Midwest staples
  if (/walleye|wild rice|midwest|tater tot|hotdish/.test(n)) {
    return 'Midwest Heritage Classics';
  }
  // Executive express
  if (/express/.test(n)) {
    return 'Executive Express Selections';
  }
  // Lunch/entrees fallback
  if (/entree|steak|chicken|salmon|shrimp|pasta|sandwich|tray|box|duck|pork/.test(n)) {
    return 'Gourmet Creations';
  }
  // Default fallback
  return 'In-Flight Lunch Selections';
}

(function main() {
  try { fs.unlinkSync(LOG); } catch {}
  log('[normalize] start');

  const mapByName = loadAuthoritativeMap();
  const valid = loadValidCategories();

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
      let catName = key && mapByName.get(key);

      if (!catName) {
        // try fuzzy match: remove common suffixes and try again
        const normalized = key.replace(/\b(bowl|square|box|boxes)\b/g, '').trim();
        if (normalized && normalized !== key) {
          catName = mapByName.get(normalized);
        }
      }

      if (!catName) {
        // Try fallback: if the current value resembles a valid category name
        if (typeof current === 'string' && current.trim() && valid.hasName(current.trim())) {
          catName = current.trim();
        }
      }

      if (!catName) {
        // Heuristic based on item name
        catName = heuristicCategoryFor(data.name);
      }

      if (catName) {
        const before = data.category;
        data.category = categoryPathFor(catName);
        fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n', 'utf8');
        fixed++;
        log(`[fixed] ${file}: '${before}' -> '${data.category}'`);
      } else {
        skipped++;
        log(`[skip] ${file}: could not determine category (current='${current}')`);
      }
    } catch (e) {
      log(`[error] ${file}: ${e.message}`);
    }
  }
  log(`[normalize] done. Fixed=${fixed} Skipped=${skipped} Total=${files.length}`);
  console.log(`Category normalization done. Fixed: ${fixed}, Unchanged: ${skipped}, Total: ${files.length}`);
})();

