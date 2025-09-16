import { test, expect } from '@playwright/test';

// Use a stored authenticated session. We'll capture it via `npx playwright codegen --save-storage=.auth/admin.json`.
test.use({ storageState: '.auth/admin.json' });

const SITE = process.env.SITE_URL || 'https://atikis-flight-catering.netlify.app';

const EXPECTED = [
  'Signature Breakfast Collection',
  'Artisan Salad and Grain Bowls',
  'In-Flight Lunch Selections',
  'Midwest Heritage Classics',
  'Gourmet Creations',
  'Plant-Based Culinary Selections',
  'Elegant Desserts and Confections',
  'Executive Express Selections',
];

// Helper to normalize option labels (strip numeric prefixes like `1 —` if present)
function normalize(label: string) {
  return label.replace(/^\s*[0-9]+\s*[—\-]\s*/, '').trim();
}

// Opens the Category dropdown and returns the list of visible option texts
async function getCategoryOptions(page) {
  // Try standard combobox label first
  const combo = page.getByRole('combobox', { name: /category/i });
  if (await combo.count()) {
    await combo.first().click();
  } else {
    // Fallback: click near the Category label
    const label = page.getByText(/^\s*Category\s*$/i).first();
    await label.click();
  }
  // Wait for listbox/options to appear
  await page.waitForTimeout(300); // tiny pause for popover render
  const options = await page.getByRole('option').allTextContents();
  return options.map(normalize);
}

// Navigates into Menu Items and opens the first item (or the create form)
async function openAnyMenuItemEditor(page) {
  // Tina Admin home
  await page.goto(`${SITE}/admin`, { waitUntil: 'networkidle' });

  // Click the Menu Items collection
  const menuItemsLink = page.getByRole('link', { name: /menu items/i });
  await expect(menuItemsLink).toBeVisible({ timeout: 15000 });
  await menuItemsLink.click();

  // Either click the first document in the list or click Create New
  const firstDoc = page.locator('a:visible').filter({ hasText: /.+/ }).first();
  if (await firstDoc.count()) {
    await firstDoc.click();
  } else {
    const createBtn = page.getByRole('button', { name: /create/i });
    await createBtn.click();
  }

  // Wait for editor to load
  await expect(page.getByText(/Category/i)).toBeVisible({ timeout: 15000 });
}

test('Tina Admin: Category dropdown shows 8 categories in correct order', async ({ page }) => {
  await openAnyMenuItemEditor(page);
  const options = await getCategoryOptions(page);

  // Report the captured list for debugging
  console.log('Captured Category options:', options);

  // Must be exactly 8 and in the expected order
  expect(options).toEqual(EXPECTED);
});

