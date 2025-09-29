import MenuClient, { UICategory, UIMenuItem } from './MenuClient'
import { getMenuCategories, getMenuItems } from '@/lib/content/menu'
import { translations } from '@/lib/i18n/translations'

export default async function Menu() {
  // Load content from Tina CMS with proper error handling
  const tinaCategories = getMenuCategories()
  const tinaItems = getMenuItems()

  // Ensure we have categories and items - if not, show appropriate message
  const categories: UICategory[] = tinaCategories.map((c) => ({ key: c.key, name: c.name }))

  const items: UIMenuItem[] = tinaItems.map((i) => ({
    id: i.id,
    title: i.title,
    description: i.description ?? '',
    category: i.category,
    image: i.image,
    featured: false,
    sections: (i.sections ?? []).map(section => ({
      title: section.title ?? '',
      items: section.items ?? []
    })),
    boxMaxItemsPerBox: i.boxMaxItemsPerBox,
  }))

  // If no content is available, we'll handle this in the client component
  if (categories.length === 0 || items.length === 0) {
    console.warn('Menu content not available from Tina CMS')
  }

  const menuI18n = translations.en.menu as unknown as {
    title: string;
    subtitle: string;
    customMenuTitle: string;
    customMenuDescription: string;
    requestCustomMenu: string;
    qualityTitle: string;
    qualityDescription1: string;
    qualityDescription2: string;
  }

  const i18nStrings = {
    title: menuI18n.title,
    subtitle: menuI18n.subtitle,
    customTitle: menuI18n.customMenuTitle,
    customDescription: menuI18n.customMenuDescription,
    requestLabel: menuI18n.requestCustomMenu,
    qualityTitle: menuI18n.qualityTitle,
    qualityDescription1: menuI18n.qualityDescription1,
    qualityDescription2: menuI18n.qualityDescription2,
  }

  return <MenuClient categories={categories} items={items} i18nStrings={i18nStrings} />
}

