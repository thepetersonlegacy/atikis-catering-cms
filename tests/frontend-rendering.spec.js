const { test, expect } = require('@playwright/test')

const SITE = process.env.SITE_URL || process.env.BASE_URL || 'http://127.0.0.1:3000'

const GALLERY_ITEMS = [
  'Classic Box Lunch',
  'Crudite',
  'Euro Continental Breakfast',
  'Fruit Tray',
  'Mezze',
  'Shrimp Cocktail',
]

function menuItemCard(page, title) {
  return page.locator('article').filter({
    has: page.getByRole('heading', { name: title, exact: true }),
  }).first()
}

async function openMenuCategory(page, name) {
  const tab = page.getByRole('tab', { name })
  await expect(tab).toBeVisible()
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}

async function expectOptimizedGalleryImage(figure, title) {
  const image = figure.locator(`img[alt="${title}"]`)
  await expect(image).toBeVisible()

  const attrs = await image.evaluate((img) => ({
    src: decodeURIComponent(img.getAttribute('src') || ''),
    srcSet: decodeURIComponent(img.getAttribute('srcset') || ''),
    currentSrc: decodeURIComponent(img.currentSrc || ''),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
  }))

  expect(attrs.src).toContain('/optimized/images/gallery/')
  expect(attrs.src).toContain('_mobile.jpg')
  expect(attrs.srcSet).toContain('/optimized/images/gallery/')
  expect(attrs.srcSet).toContain('_tablet.jpg')
  expect(attrs.srcSet).toContain('_desktop.jpg')
  expect(attrs.currentSrc).toContain('/optimized/images/gallery/')
  expect(attrs.currentSrc).toContain(title)
  expect(attrs.complete).toBeTruthy()
  expect(attrs.naturalWidth).toBeGreaterThan(0)
}

test.describe('Frontend rendering for updated gallery and menu content', () => {
  test('gallery page shows the six newly added items with optimized responsive images', async ({ page }) => {
    await page.goto(`${SITE}/gallery`, { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible()

    for (const title of GALLERY_ITEMS) {
      const figure = page.locator('figure').filter({ hasText: title }).first()
      await expect(figure).toBeVisible()
      await expect(figure.locator('figcaption')).toHaveText(title)
      await expectOptimizedGalleryImage(figure, title)
    }
  })

  test('menu page shows updated breakfast and lunch items in the correct tabs', async ({ page }) => {
    await page.goto(`${SITE}/menu`, { waitUntil: 'networkidle' })

    await openMenuCategory(page, /Signature Breakfast/i)

    const euroBreakfast = menuItemCard(page, 'Euro Continental Breakfast')
    await expect(euroBreakfast).toBeVisible()
    await expect(euroBreakfast).toContainText('Consists of baked goods, cheeses, cold cuts/cured meats, crackers, yogurt, granola, fruit, boiled eggs, and juice.')

    const proteinBox = menuItemCard(page, 'Protein Box')
    await expect(proteinBox).toBeVisible()
    await expect(proteinBox).toContainText('Fresh berries, protein bar or protein balls, crudite & hummus, side salad, protein shake, sliced grilled chicken, steak and grilled shrimp. Shrimp cocktail optional.')

    await openMenuCategory(page, /In-Flight Lunch/i)

    const classicBoxLunch = menuItemCard(page, 'Classic Box Lunch')
    await expect(classicBoxLunch).toBeVisible()
    await expect(classicBoxLunch).toContainText('A Box of your choice of sandwich or wrap plus a bag of chips, savory salad, fresh fruit, dessert & cookie.')

    const snackBox = menuItemCard(page, 'Snack Box/Tray')
    await expect(snackBox).toBeVisible()
    await expect(snackBox).toContainText('Snack box contains a variety of healthy snacks, salads, ½ a sandwich or wrap, crudite, fresh fruit, shrimp cocktail, artisan meat & cheese, dessert and more to satisfy any type of craving.')
  })

  test('menu page reflects ingredient updates and dessert deduplication', async ({ page }) => {
    await page.goto(`${SITE}/menu`, { waitUntil: 'networkidle' })

    await openMenuCategory(page, /Artisan Salad/i)

    const anchoSteak = menuItemCard(page, 'Ancho Steak')
    await expect(anchoSteak).toBeVisible()
    await expect(anchoSteak).toContainText('rice')
    await expect(anchoSteak).not.toContainText('cilantro beer rice')

    const classicCobb = menuItemCard(page, 'Classic Cobb')
    await expect(classicCobb).toBeVisible()
    await expect(classicCobb).toContainText('cheddar')

    await openMenuCategory(page, /Elegant Desserts/i)

    const chocolateMousse = page.getByRole('heading', { name: 'Chocolate Mousse', exact: true })
    await expect(chocolateMousse).toHaveCount(1)
    await expect(chocolateMousse.first()).toBeVisible()

    const miniDesserts = page.getByRole('heading', { name: 'Mini Desserts', exact: true })
    await expect(miniDesserts).toHaveCount(1)
    await expect(miniDesserts.first()).toBeVisible()
  })
})