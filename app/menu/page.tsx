import MenuClient, { UICategory, UIMenuItem } from './MenuClient'
import { getMenuCategories, getMenuItems } from '@/lib/content/menu'
import { allMenuItems } from '@/lib/data/menu-data'
import { translations } from '@/lib/i18n/translations'

export default async function Menu() {
  // Prefer Tina content; fall back to static data if needed
  const tinaCategories = getMenuCategories()
  const tinaItems = getMenuItems()

  const categories: UICategory[] = tinaCategories.length
    ? tinaCategories.map((c) => ({ key: c.key, name: c.name }))
    : []

  const items: UIMenuItem[] = (tinaItems.length ? tinaItems : allMenuItems).map((i) => ({
    id: i.id,
    title: i.title,
    description: (i as any).description ?? '',
    category: i.category,
    image: (i as any).image,
    featured: false,
    sections: (i as any).sections ?? [],
    boxMaxItemsPerBox: (i as any).boxMaxItemsPerBox,
  }))

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

