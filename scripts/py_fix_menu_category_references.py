import json, os, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ITEMS_DIR = ROOT / 'content' / 'menu'
CAT_DIR = ROOT / 'content' / 'menu-categories'

CATS = {
    'Signature Breakfast Collection': 'signature-breakfast-collection.json',
    'Elegant Desserts and Confections': 'elegant-desserts-and-confections.json',
    'Artisan Salad and Grain Bowls': 'artisan-salad-and-grain-bowls.json',
    'Plant-Based Culinary Selections': 'plant-based-culinary-selections.json',
    'Midwest Heritage Classics': 'midwest-heritage-classics.json',
    'Executive Express Selections': 'executive-express-selections.json',
    'Gourmet Creations': 'gourmet-creations.json',
    'In-Flight Lunch Selections': 'in-flight-lunch-selections.json',
}

CAT_PATH = {name: f"content/menu-categories/{slug}" for name, slug in CATS.items()}

# Simple heuristics based on item name
BREK = re.compile(r"breakfast|bagel|toast|oatmeal|omelet|frittata|quiche|granola|yogurt", re.I)
DESS = re.compile(r"dessert|cookie|brownie|cake|mousse|cheesecake|confection|mini\s*dessert", re.I)
SALD = re.compile(r"salad|bowl|buddha|nicoise|caesar|arugula|greens", re.I)
PLNT = re.compile(r"vegan|tofu|plant", re.I)
MIDW = re.compile(r"walleye|wild\s*rice|midwest|tater\s*tot|hotdish", re.I)
EXPR = re.compile(r"express", re.I)
LUNC = re.compile(r"box|boxed|lunch|snack", re.I)
ENTR = re.compile(r"entree|steak|chicken|salmon|shrimp|pasta|sandwich|duck|pork", re.I)


def guess_category(name: str) -> str:
    n = (name or '').strip()
    if not n:
        return None
    if BREK.search(n):
        return 'Signature Breakfast Collection'
    if DESS.search(n):
        return 'Elegant Desserts and Confections'
    if SALD.search(n):
        return 'Artisan Salad and Grain Bowls'
    if PLNT.search(n):
        return 'Plant-Based Culinary Selections'
    if MIDW.search(n):
        return 'Midwest Heritage Classics'
    if EXPR.search(n):
        return 'Executive Express Selections'
    if LUNC.search(n):
        return 'In-Flight Lunch Selections'
    if ENTR.search(n):
        return 'Gourmet Creations'
    return 'In-Flight Lunch Selections'


def main():
    files = sorted(p for p in ITEMS_DIR.glob('*.json'))
    fixed = 0
    unchanged = 0
    for p in files:
        try:
            data = json.loads(p.read_text())
        except Exception as e:
            print(f"[error] {p.name}: {e}")
            continue
        cat = data.get('category')
        if isinstance(cat, str) and cat.startswith('content/menu-categories/'):
            unchanged += 1
            continue
        # try by name heuristic
        name = data.get('name') or data.get('title')
        cat_name = guess_category(name)
        if cat_name:
            data['category'] = CAT_PATH[cat_name]
            p.write_text(json.dumps(data, indent=2) + "\n")
            fixed += 1
        else:
            unchanged += 1
    print(f"Fixed: {fixed}, Unchanged: {unchanged}, Total: {len(files)}")

if __name__ == '__main__':
    main()

