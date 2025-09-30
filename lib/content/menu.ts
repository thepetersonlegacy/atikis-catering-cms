import fs from 'fs'
import path from 'path'

export type TinaMenuCategory = {
  key: string
  name: string
  order?: number
  filePath: string
}

export type TinaMenuItem = {
  id: string
  title: string
  description?: string
  category: string
  image?: string
  sections?: { title?: string; items?: string[] }[]
  boxMaxItemsPerBox?: number
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')
const MENU_DIR = path.join(CONTENT_ROOT, 'menu')
const CAT_DIR = path.join(CONTENT_ROOT, 'menu-categories')

function readJSON<T = any>(p: string): T {
  const raw = fs.readFileSync(p, 'utf8')
  return JSON.parse(raw) as T
}

export function getMenuCategories(): TinaMenuCategory[] {
  if (!fs.existsSync(CAT_DIR)) return []
  const files = fs.readdirSync(CAT_DIR).filter((f) => f.endsWith('.json'))
  const cats = files.map((file) => {
    const json = readJSON<{ name: string; order?: number }>(path.join(CAT_DIR, file))
    const key = file.replace(/\.json$/, '')
    return { key, name: json.name, order: json.order, filePath: path.join('content/menu-categories', file) }
  })
  // sort by optional order, then by name
  return cats.sort((a, b) => {
    const ao = a.order ?? 9999
    const bo = b.order ?? 9999
    if (ao !== bo) return ao - bo
    return a.name.localeCompare(b.name)
  })
}

export function getMenuItems(): TinaMenuItem[] {
  // Build a map of category reference path -> category name
  const categories = getMenuCategories()
  const refToName = new Map<string, string>()
  for (const c of categories) {
    refToName.set(c.filePath, c.name)
  }

  if (!fs.existsSync(MENU_DIR)) return []
  const files = fs.readdirSync(MENU_DIR).filter((f) => f.endsWith('.json'))

  const items: TinaMenuItem[] = []
  for (const file of files) {
    const p = path.join(MENU_DIR, file)
    const json = readJSON<any>(p)
    const id = file.replace(/\.json$/, '')
    const name = json.name as string
    const description = json.description as string | undefined
    const categoryRef = json.category as string | undefined
    const categoryName = categoryRef ? (refToName.get(categoryRef) ?? categoryRef) : ''
    const image = json.image as string | undefined
    const sections = json.sections as { title?: string; items?: string[] }[] | undefined
    const boxMaxItemsPerBox = json.boxMaxItemsPerBox as number | undefined

    items.push({
      id,
      title: name,
      description,
      category: categoryName,
      image,
      sections,
      boxMaxItemsPerBox,
    })
  }

  // Sort items to move all "Box Options" items to the bottom
  // Box options are items that contain "Boxes Available" in their name
  return items.sort((a, b) => {
    const aIsBoxOption = a.title.includes('Boxes Available')
    const bIsBoxOption = b.title.includes('Boxes Available')

    // If both are box options or both are regular items, maintain alphabetical order
    if (aIsBoxOption === bIsBoxOption) {
      return a.title.localeCompare(b.title)
    }

    // Box options go to the bottom (return 1 means a comes after b)
    return aIsBoxOption ? 1 : -1
  })
}

