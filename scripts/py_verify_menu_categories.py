import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ITEMS_DIR = ROOT / 'content' / 'menu'
CAT_DIR = ROOT / 'content' / 'menu-categories'


def main():
    cat_files = {f"content/menu-categories/{p.name}": p for p in CAT_DIR.glob('*.json')}
    bad = []
    total = 0
    for p in sorted(ITEMS_DIR.glob('*.json')):
        total += 1
        try:
            data = json.loads(p.read_text())
        except Exception as e:
            bad.append((p.name, f'JSON error: {e}'))
            continue
        cat = data.get('category')
        if isinstance(cat, str) and cat in cat_files:
            continue
        bad.append((p.name, f'category={cat!r}'))
    print(f'Total items: {total}')
    print(f'Bad items: {len(bad)}')
    if bad:
        for name, issue in bad[:100]:
            print(f'- {name}: {issue}')


if __name__ == '__main__':
    main()

