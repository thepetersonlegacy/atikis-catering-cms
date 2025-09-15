import { client } from '@/tina/__generated__/client'
import MenuClient, { UICategory, UIMenuItem } from './MenuClient'
import { translations } from '@/lib/i18n/translations'

export default async function Menu() {
  // Fetch Tina categories and items
  const [catsRes, itemsRes] = await Promise.all([
    client.queries.menuCategoriesConnection({ first: 200, sort: 'order' }),
    client.queries.menuItemsConnection({ first: 1000 }),
  ])

  const categories: UICategory[] = (catsRes?.data?.menuCategoriesConnection?.edges || [])
    .map((e: any) => e?.node)
    .filter(Boolean)
    .map((node: any) => ({
      key: node._sys?.filename || node._sys?.relativePath || node.name,
      name: node.name,
    }))

  const catPathToName = new Map<string, string>()
  ;(catsRes?.data?.menuCategoriesConnection?.edges || []).forEach((e: any) => {
    const node = e?.node
    if (node?._sys?.relativePath && node?.name) {
      catPathToName.set(node._sys.relativePath, node.name)
    }
    if (node?._sys?.path && node?.name) {
      catPathToName.set(node._sys.path.replace(/^\//, ''), node.name)
    }
  })

  const items: UIMenuItem[] = (itemsRes?.data?.menuItemsConnection?.edges || [])
    .map((e: any) => e?.node)
    .filter(Boolean)
    .map((n: any) => ({
      id: n._sys?.filename || n._sys?.basename,
      title: n.name,
      description: n.description || '',
      category: typeof n.category === 'string' ? (catPathToName.get(n.category) || n.category) : '',
      image: n.image,
      featured: n.featured,
      sections: n.sections || [],
      boxMaxItemsPerBox: n.boxMaxItemsPerBox,
    }))

  const i18nStrings = {
    title: translations.en.menu.title,
    subtitle: translations.en.menu.subtitle,
    customTitle: translations.en.menu.customMenuTitle,
    customDescription: translations.en.menu.customMenuDescription,
    requestLabel: translations.en.menu.requestCustomMenu,
    qualityTitle: translations.en.menu.qualityTitle,
    qualityDescription1: translations.en.menu.qualityDescription1,
    qualityDescription2: translations.en.menu.qualityDescription2,
  }

  return <MenuClient categories={categories} items={items} i18nStrings={i18nStrings} />
}

