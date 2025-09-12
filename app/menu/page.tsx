"use client"

import { useState } from 'react'
import { useI18n } from '@/lib/i18n/i18n-context'
import { translations } from '@/lib/i18n/translations'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { menuCategoryKeys, allMenuItems } from '@/lib/data/menu-data'
import MenuHero from '@/components/menu/MenuHero'
import { MenuItemCard } from '@/components/menu/MenuItemCard'
import { OrderSummary, OrderItem } from '@/components/menu/OrderSummary'
import { MenuItem } from '@/lib/data/menu-data'
import Image from 'next/image'

export default function Menu() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const i18n = useI18n()

  const handleAddToOrder = (item: MenuItem, quantity: number, notes?: string, boxSelections?: any[]) => {
    // When Box Options are selected, group into a single cart line with nested selections
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

    // Fallback: regular single item add
    const newOrderItem: OrderItem = {
      item,
      quantity,
      notes,
      id: `${item.id}-${Date.now()}-${Math.random()}`,
    }
    setOrderItems(prev => [...prev, newOrderItem])
  }

  const handleRemoveItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id))
  }

  const handleClearOrder = () => {
    setOrderItems([])
  }

  return (
    <>
      <MenuHero />
      
      <section className="py-16 bg-white" itemScope itemType="https://schema.org/Menu">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">{i18n.t('menu.title')}</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-[1.618]">{i18n.t('menu.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Menu Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue={menuCategoryKeys[0]} className="w-full">
                <div className="mb-13 relative">
                  {/* Left Arrow */}
                  <button
                    id="scroll-left"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 transition-opacity duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => {
                      const container = document.getElementById('tabs-container');
                      if (container) {
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Scroll menu left"
                  >
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right Arrow */}
                  <button
                    id="scroll-right"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-100 transition-opacity duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => {
                      const container = document.getElementById('tabs-container');
                      if (container) {
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Scroll menu right"
                  >
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div 
                    id="tabs-container"
                    className="overflow-x-auto scrollbar-hide px-8"
                    onScroll={() => {
                      const container = document.getElementById('tabs-container');
                      const leftArrow = document.getElementById('scroll-left');
                      const rightArrow = document.getElementById('scroll-right');
                      
                      if (container && leftArrow && rightArrow) {
                        const { scrollLeft, scrollWidth, clientWidth } = container;
                        
                        // Show/hide left arrow
                        if (scrollLeft > 10) {
                          leftArrow.style.opacity = '1';
                        } else {
                          leftArrow.style.opacity = '0';
                        }
                        
                        // Show/hide right arrow
                        if (scrollLeft < scrollWidth - clientWidth - 10) {
                          rightArrow.style.opacity = '1';
                        } else {
                          rightArrow.style.opacity = '0';
                        }
                      }
                    }}
                  >
                    <TabsList className="flex justify-start gap-3 p-3 min-w-max mx-auto">
                    {menuCategoryKeys.map((categoryKey) => (
                      <TabsTrigger 
                        key={categoryKey} 
                        value={categoryKey}
                        className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white px-6 py-3 text-sm whitespace-nowrap rounded-lg transition-all duration-300 flex-shrink-0"
                      >
                        {i18n.t(`menuCategories.${categoryKey}`)}
                      </TabsTrigger>
                    ))}
                    </TabsList>
                  </div>
                </div>
                
                {menuCategoryKeys.map((categoryKey) => {
                  const categoryName = i18n.t(`menuCategories.${categoryKey}`);
                  const englishCategoryName = (translations.en.menuCategories as Record<string, string>)[categoryKey];
                  const categoryItems = allMenuItems.filter(item => item.category === englishCategoryName);
                  
                  return (
                    <TabsContent key={categoryKey} value={categoryKey} className="mt-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {categoryItems.map(item => (
                          <div key={item.id} itemScope itemType="https://schema.org/MenuItem">
                            <MenuItemCard 
                            key={item.id} 
                            item={item} 
                            onAddToOrder={handleAddToOrder}
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary 
                orderItems={orderItems}
                onRemoveItem={handleRemoveItem}
                onClearOrder={handleClearOrder}
              />
            </div>
          </div>

          {/* Custom Menu Section */}
          <div className="mt-26 text-center">
            <div className="bg-gray-50 p-13 rounded-lg max-w-3xl mx-auto">
              <h3 className="font-montserrat text-2xl font-bold mb-6">{i18n.t('menu.customMenuTitle')}</h3>
              <p className="text-gray-600 mb-10 leading-[1.618]">{i18n.t('menu.customMenuDescription')}</p>
              <Button asChild className="bg-[#D4AF37] hover:bg-[#B69121] text-white px-8 py-4 text-base">
                <a href="mailto:order@atikismn.com">{i18n.t('menu.requestCustomMenu')}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-13 md:mb-0">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">{i18n.t('menu.qualityTitle')}</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mb-10"></div>
              <p className="text-lg text-gray-300 mb-10 leading-[1.618]">{i18n.t('menu.qualityDescription1')}</p>
              <p className="text-lg text-gray-300 leading-[1.618]">{i18n.t('menu.qualityDescription2')}</p>
            </div>
            <div className="md:w-1/2 md:pl-20">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square relative">
                  <Image
                    src="/images/hero/logos/atikis-logo-primary.png"
                    alt="Atikis Minnesota Aviation Catering Logo"
                    fill
                    className="object-contain"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}