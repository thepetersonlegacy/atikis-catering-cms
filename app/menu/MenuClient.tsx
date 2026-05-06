"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MenuHero from '@/components/menu/MenuHero'
import { MenuItemCard } from '@/components/menu/MenuItemCard'
import { OrderSummary, OrderItem } from '@/components/menu/OrderSummary'

export type UICategory = { key: string; name: string }
export type UIMenuItem = {
  id: string
  title: string
  description: string
  category: string
  image?: string
  featured?: boolean
  sections?: { title: string; items: string[] }[]
  boxMaxItemsPerBox?: number
}

export default function MenuClient({
  categories,
  items,
  i18nStrings,
}: {
  categories: UICategory[]
  items: UIMenuItem[]
  i18nStrings: { title: string; subtitle: string; customTitle: string; customDescription: string; requestLabel: string; qualityTitle: string; qualityDescription1: string; qualityDescription2: string }
}) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.key ?? '')

  const handleAddToOrder = (item: any, quantity: number, notes?: string, boxSelections?: any[]) => {
    if (boxSelections && boxSelections.length > 0) {
      const groupedSelections = boxSelections
        .filter((s: any) => s && s.itemName && s.quantity > 0)
        .map((sel: any) => ({ itemName: sel.itemName, quantity: sel.quantity, note: sel.note }))

      if (groupedSelections.length > 0) {
        const id = `${item.id}-box-${Date.now()}-${Math.random()}`
        const groupedNotes = [notes, `From Box Options: ${item.title}`]
          .filter(Boolean)
          .join(' | ')
        const newOrderItem: OrderItem = {
          item,
          quantity, // number of boxes
          notes: groupedNotes,
          id,
          boxSelections: groupedSelections,
        }
        setOrderItems(prev => [...prev, newOrderItem])
        return
      }
    }

    const newOrderItem: OrderItem = {
      item,
      quantity,
      notes,
      id: `${item.id}-${Date.now()}-${Math.random()}`,
    }
    setOrderItems(prev => [...prev, newOrderItem])
  }

  const handleRemoveItem = (id: string) => setOrderItems(prev => prev.filter(item => item.id !== id))
  const handleClearOrder = () => setOrderItems([])

  // Handle empty content state
  if (categories.length === 0 || items.length === 0) {
    return (
      <>
        <MenuHero />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">{i18nStrings.title}</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-600 mb-8">We&apos;re currently updating our menu. Please check back soon or contact us directly for current offerings.</p>
              <Button
                asChild
                className="bg-[#D4AF37] hover:bg-[#B69121] text-white font-semibold px-8 py-3 rounded-full"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const categoryItemCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.key] = items.filter(item =>
      item.category === cat.name && !item.title.toLowerCase().includes('boxes available')
    ).length
    return acc
  }, {})

  return (
    <>
      <MenuHero />

      <section className="py-16 bg-white" itemScope itemType="https://schema.org/Menu">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">{i18nStrings.title}</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-[1.618]">{i18nStrings.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Tabs value={selectedCategory || categories[0]?.key} onValueChange={setSelectedCategory} className="w-full">
                <div
                  className="mb-10 rounded-2xl border border-[#D4AF37]/20 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">Explore the menu</p>
                      <h2 className="font-montserrat text-2xl font-bold text-gray-950">Choose a category</h2>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-gray-500">Select any collection below to instantly reveal its dishes—no horizontal scrolling required.</p>
                  </div>

                  <TabsList className="grid h-auto w-full grid-cols-1 gap-3 rounded-none bg-transparent p-0 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map((cat) => (
                      <TabsTrigger
                        key={cat.key}
                        value={cat.key}
                        className="group h-full min-h-[92px] whitespace-normal rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:shadow-lg data-[state=active]:border-[#D4AF37] data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#B69121] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#D4AF37]/20"
                      >
                        <span className="flex h-full w-full flex-col items-start justify-between gap-3">
                          <span className="font-montserrat text-sm font-semibold leading-snug text-gray-900 group-data-[state=active]:text-white sm:text-[15px]">
                            {cat.name}
                          </span>
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white/90">
                            {categoryItemCounts[cat.key]} selections
                          </span>
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map((cat) => {
                  const catItems = items.filter(i => i.category === cat.name)

                  // Separate regular items from Box Options items
                  const regularItems = catItems.filter(item =>
                    !item.title.toLowerCase().includes('boxes available')
                  )
                  const boxOptionsItems = catItems.filter(item =>
                    item.title.toLowerCase().includes('boxes available')
                  )

                  return (
                    <TabsContent key={cat.key} value={cat.key} className="mt-8 pt-0">
                      {/* Regular menu items in 2-column grid */}
                      {regularItems.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                          {regularItems.map(item => (
                            <div key={item.id} itemScope itemType="https://schema.org/MenuItem">
                              <MenuItemCard key={item.id} item={item as any} onAddToOrder={handleAddToOrder} />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Box Options items in full-width rows */}
                      {boxOptionsItems.length > 0 && (
                        <div className="space-y-8 mt-12">
                          <div className="border-t-2 border-[#D4AF37] pt-8">
                            {boxOptionsItems.map(item => (
                              <div key={item.id} itemScope itemType="https://schema.org/MenuItem" className="mb-8">
                                <MenuItemCard key={item.id} item={item as any} onAddToOrder={handleAddToOrder} isBoxOption={true} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  )
                })}
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary orderItems={orderItems} onRemoveItem={handleRemoveItem} onClearOrder={handleClearOrder} />
            </div>
          </div>

          <div className="mt-26 text-center">
            <div className="bg-gray-50 p-13 rounded-lg max-w-3xl mx-auto">
              <h3 className="font-montserrat text-2xl font-bold mb-6">{i18nStrings.customTitle}</h3>
              <p className="text-gray-600 mb-10 leading-[1.618]">{i18nStrings.customDescription}</p>
              <Button asChild className="bg-[#D4AF37] hover:bg-[#B69121] text-white px-8 py-4 text-base">
                <a href="mailto:order@atikismn.com">{i18nStrings.requestLabel}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-13 md:mb-0">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">{i18nStrings.qualityTitle}</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mb-10"></div>
              <p className="text-lg text-gray-300 mb-10 leading-[1.618]">{i18nStrings.qualityDescription1}</p>
              <p className="text-lg text-gray-300 leading-[1.618]">{i18nStrings.qualityDescription2}</p>
            </div>
            <div className="md:w-1/2 md:pl-20">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square relative">
                  <img src="/images/hero/logos/atikis-logo-primary.png" alt="Atikis Minnesota Aviation Catering Logo" className="object-contain w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

