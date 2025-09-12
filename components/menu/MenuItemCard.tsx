"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Minus, ShoppingCart, ChevronDown } from 'lucide-react'
import { MenuItem } from '@/lib/data/menu-data'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/lib/hooks/use-toast'
import { useI18n } from '@/lib/i18n/i18n-context'

interface MenuItemCardProps {
  item: MenuItem;
  onAddToOrder: (item: MenuItem, quantity: number, notes?: string, boxSelections?: BoxSelection[]) => void;
}

interface BoxSelection {
  itemName: string;
  quantity: number;
  note?: string;
}

export const MenuItemCard = ({ item, onAddToOrder }: MenuItemCardProps) => {
  const { t, tp } = useI18n()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const [boxSelections, setBoxSelections] = useState<BoxSelection[]>([])
  const [inlineConfirm, setInlineConfirm] = useState(false)

  // Check if this is a box options item
  const isBoxOptionsItem = item.sections && item.sections.some(section =>
    section.title.toLowerCase().includes('box options') ||
    section.title.toLowerCase().includes('available')
  )

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleBoxSelectionChange = (itemName: string, newQuantity: number) => {
    setBoxSelections(prev => {
      const existing = prev.find(sel => sel.itemName === itemName)
      if (existing) {
        if (newQuantity === 0) {
          return prev.filter(sel => sel.itemName !== itemName)
        }
        return prev.map(sel =>
          sel.itemName === itemName ? { ...sel, quantity: newQuantity } : sel
        )
      } else if (newQuantity > 0) {
        return [...prev, { itemName, quantity: newQuantity }]
      }
      return prev
    })
  }

  const handleAddToOrder = () => {
    const cleanSelections = boxSelections.filter(sel => sel.quantity > 0)

    const orderNotes = isBoxOptionsItem && cleanSelections.length > 0
      ? notes // Parent will expand selections and attach per-option notes
      : notes

    onAddToOrder(item, quantity, orderNotes, isBoxOptionsItem ? cleanSelections : undefined)
    setIsAdded(true)
    // Toast and clear selections for Box Options
    if (isBoxOptionsItem && cleanSelections.length > 0) {
      const toastTitle = `${t('menu.boxOptions.toastAddedPrefix')} ${totalBoxItems} ${tp('menu.boxOptions.item', totalBoxItems)} ${t('menu.boxOptions.toastFrom')} ${item.title}`
      toast({ title: toastTitle })
      setBoxSelections([])
      setInlineConfirm(true)
      setTimeout(() => setInlineConfirm(false), 2000)
    }
    setTimeout(() => setIsAdded(false), 2000)
  }

  const totalBoxItems = boxSelections.reduce((sum, sel) => sum + sel.quantity, 0)
  const maxPerBox = isBoxOptionsItem ? (item as any).boxMaxItemsPerBox ?? null : null
  const maxReached = maxPerBox !== null && totalBoxItems >= maxPerBox

  return (
    <article className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]">
      <div className="mb-6">
        <h3 className="font-montserrat text-xl font-bold mb-5 text-gray-900 leading-[1.3]" itemProp="name">{item.title}</h3>
        <p className="text-gray-600 text-base leading-[1.618]" itemProp="description">{item.description}</p>
      </div>

      {item.sections && (
        <div className="space-y-6 mt-6 mb-8">
          {item.sections.map((section, index) => {
            const isBoxSection = section.title.toLowerCase().includes('box options') ||
                                section.title.toLowerCase().includes('available')

            if (isBoxSection) {
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-montserrat text-base font-semibold text-[#D4AF37] mb-5 border-b border-gray-200 pb-3">
                    {section.title}
                  </h4>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      {t('menu.boxOptions.selectionHeader')}
                    </p>

                    {/* Interactive Box Selection */}
                    <div className="grid gap-4">
                      {(() => {
                        const sortedItems = [...section.items].sort((a, b) => {
                          const aSel = boxSelections.find(sel => sel.itemName === a)
                          const bSel = boxSelections.find(sel => sel.itemName === b)
                          const aQty = aSel?.quantity || 0
                          const bQty = bSel?.quantity || 0
                          return bQty - aQty
                        })
                        return sortedItems.map((boxItem, itemIndex) => {
                          const currentSelection = boxSelections.find(sel => sel.itemName === boxItem)
                          const currentQty = currentSelection?.quantity || 0

                          return (
                            <div key={itemIndex} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                              <span className="text-sm font-medium text-gray-700 flex-1">
                                {boxItem}
                              </span>
                              <div className="flex items-center space-x-2 ml-4">
                                <Button
                                  aria-label={`Decrease ${boxItem} quantity`}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBoxSelectionChange(boxItem, Math.max(0, currentQty - 1))}
                                  className="h-7 w-7 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                                  disabled={currentQty === 0}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  aria-label={`${boxItem} quantity`}
                                  type="number"
                                  value={currentQty}
                                  onChange={(e) => {
                                    const raw = parseInt(e.target.value)
                                    const nextVal = isNaN(raw) ? 0 : Math.max(0, raw)
                                    const capped = maxPerBox ? Math.min(nextVal, Math.max(0, maxPerBox - (totalBoxItems - currentQty))) : nextVal
                                    handleBoxSelectionChange(boxItem, capped)
                                  }}
                                  className="w-12 text-center text-xs border-[#D4AF37] focus:ring-[#D4AF37]"
                                  min="0"
                                  max={maxPerBox ? Math.max(0, maxPerBox - (totalBoxItems - currentQty)) : 99}
                                />
                                <Button
                                  aria-label={`Increase ${boxItem} quantity`}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBoxSelectionChange(boxItem, currentQty + 1)}
                                  className="h-7 w-7 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white disabled:opacity-50"
                                  disabled={!!maxPerBox && totalBoxItems >= maxPerBox}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                {/* Per-option note */}
                                <Input
                                  type="text"
                                  value={currentSelection?.note || ''}
                                  onChange={(e) => setBoxSelections(prev => {
                                    const next = [...prev]
                                    const idx = next.findIndex(sel => sel.itemName === boxItem)
                                    if (idx > -1) {
                                      const qty = next[idx].quantity
                                      const newNote = e.target.value
                                      // If adding a note and qty is 0, bump to 1
                                      next[idx] = { ...next[idx], note: newNote, quantity: newNote && qty === 0 ? 1 : qty }
                                    } else if (e.target.value) {
                                      // Start with qty 1 if a note is typed for an unselected item
                                      next.push({ itemName: boxItem, quantity: 1, note: e.target.value })
                                    }
                                    return next
                                  })}
                                  placeholder={t('menu.boxOptions.perOptionNotePlaceholder')}
                                  className="ml-2 flex-1 text-xs border-gray-300 focus:ring-[#D4AF37]"
                                />
                              </div>
                            </div>
                          )
                        })
                      })()}
                    </div>

                    {/* Quick actions */}
                    {boxSelections.length > 0 && (
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setBoxSelections([])} className="text-red-600 hover:text-red-700">
                          {t('menu.boxOptions.clearSelections')}
                        </Button>
                      </div>
                    )}

                    {/* Selection Summary */}
                    {boxSelections.length > 0 && (
                      <div className="mt-3 p-3 bg-[#D4AF37]/10 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#D4AF37]">
                            {t('menu.boxOptions.selectedItemsLabel')}
                          </span>
                          <Badge variant="secondary" className="bg-[#D4AF37] text-white">
                            {maxPerBox && (
                              <span className="ml-2 text-xs text-gray-600">{t('menu.boxOptions.chooseUpTo')} {maxPerBox}</span>
                            )}

                        {maxReached && (
                          <div className="text-xs text-red-600">{t('menu.boxOptions.reachedMax')} {maxPerBox}</div>
                        )}

                            {totalBoxItems} {tp('menu.boxOptions.item', totalBoxItems)}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {boxSelections.map((selection, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-gray-600">
                              <span>{selection.itemName}{selection.note ? ` (Note: ${selection.note})` : ''}</span>
                              <span>×{selection.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            } else {
              // Regular section display
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-montserrat text-base font-semibold text-[#D4AF37] mb-5 border-b border-gray-200 pb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((listItem, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 flex items-start text-sm">
                        <span className="text-[#D4AF37] mr-3 mt-1.5 flex-shrink-0 text-base">•</span>
                        <span className="leading-[1.618]">{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          })}
        </div>
      )}

      {/* Order Controls */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {isBoxOptionsItem ? t('menu.boxOptions.numberOfBoxesLabel') : t('menu.boxOptions.quantityLabel')}
          </span>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center border-[#D4AF37] focus:ring-[#D4AF37]"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="h-8 w-8 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Special Notes */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Special Notes (optional):
          </label>
          <Input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Dietary restrictions, preferences, etc."
            className="border-gray-300 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
          />
        </div>

        {/* Validation Message for Box Items */}
        {isBoxOptionsItem && totalBoxItems === 0 && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            {t('menu.boxOptions.validationSelectAtLeastOne')}
          </div>
        )}

        {/* Add to Order Button */}
        <Button
          onClick={handleAddToOrder}
          disabled={isBoxOptionsItem && totalBoxItems === 0}
          className={`w-full transition-all duration-300 sticky bottom-3 sm:static sm:bottom-auto ${
            isAdded
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-[#D4AF37] hover:bg-[#B69121] text-white'
          } ${isBoxOptionsItem && totalBoxItems === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdded
            ? 'Added to Order!'
            : isBoxOptionsItem
              ? (totalBoxItems === 0
                  ? t('menu.boxOptions.selectItemsToAdd')
                  : `${t('menu.boxOptions.addItemsPrefix')} ${totalBoxItems} ${tp('menu.boxOptions.item', totalBoxItems)}`)
              : t('menu.boxOptions.addToOrder')
          }
        </Button>
        {inlineConfirm && (
          <div className="text-xs text-green-700 bg-green-50 mt-2 p-2 rounded text-center">
            {t('menu.boxOptions.inlineAdded')}
          </div>
        )}
      </div>
    </article>
  )
}