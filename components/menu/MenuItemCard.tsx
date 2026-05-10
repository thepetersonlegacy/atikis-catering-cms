"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { TinaMenuItem as MenuItem } from '@/lib/content/menu'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/lib/hooks/use-toast'
import { useI18n } from '@/lib/i18n/i18n-context'

interface MenuItemCardProps {
  item: MenuItem;
  onAddToOrder: (item: MenuItem, quantity: number, notes?: string, boxSelections?: BoxSelection[]) => void;
  isBoxOption?: boolean;
}

interface BoxSelection {
  itemName: string;
  quantity: number;
  note?: string;
}

export const MenuItemCard = ({ item, onAddToOrder, isBoxOption = false }: MenuItemCardProps) => {
  const { t, tp } = useI18n()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const [boxSelections, setBoxSelections] = useState<BoxSelection[]>([])
  const [inlineConfirm, setInlineConfirm] = useState(false)

  // Check if this is a box options item
  const isBoxOptionsItem = item.sections && item.sections.some(section =>
    section.title?.toLowerCase().includes('box options') ||
    section.title?.toLowerCase().includes('available')
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
      toast({
        title: toastTitle,
        className: 'border-[#D4AF37]/40 bg-slate-950 text-white shadow-2xl',
      })
      setBoxSelections([])
      setInlineConfirm(true)
      setTimeout(() => setInlineConfirm(false), 2000)
    }
    setTimeout(() => setIsAdded(false), 2000)
  }

  const totalBoxItems = boxSelections.reduce((sum, sel) => sum + sel.quantity, 0)
  const maxPerBox = isBoxOptionsItem ? (item as any).boxMaxItemsPerBox ?? null : null
  const maxReached = maxPerBox !== null && totalBoxItems >= maxPerBox
  const boxProgressPercent = maxPerBox
    ? Math.min(100, (totalBoxItems / maxPerBox) * 100)
    : totalBoxItems > 0 ? 100 : 0
  const selectionPhases = [
    { label: 'Select', active: totalBoxItems > 0 || isAdded },
    { label: maxPerBox ? 'Curate' : 'Review', active: totalBoxItems > 1 || maxReached || isAdded },
    { label: maxReached ? 'Ready' : 'Add', active: isAdded || maxReached },
  ]
  const addButtonLabel = isAdded
    ? 'Order added'
    : isBoxOptionsItem
      ? (totalBoxItems === 0
          ? t('menu.boxOptions.selectItemsToAdd')
          : `${t('menu.boxOptions.addItemsPrefix')} ${totalBoxItems} ${tp('menu.boxOptions.item', totalBoxItems)}`)
      : t('menu.boxOptions.addToOrder')

  return (
    <article className="mb-6 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 rounded-lg shadow-sm border-2 border-[#D4AF37] p-4 transition-all duration-300 hover:shadow-2xl hover:border-[#B69121] sm:p-6 lg:p-10">
      {item.image && !isBoxOptionsItem && (
        <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-lg border border-[#D4AF37]/20 bg-white shadow-sm">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="mb-6">
        <h3 className={`font-montserrat font-bold mb-4 text-gray-900 leading-[1.3] sm:mb-5 ${
          isBoxOption ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
        }`} itemProp="name">{item.title}</h3>
        <p className={`text-gray-600 leading-relaxed sm:leading-[1.618] ${
          isBoxOption ? 'text-sm sm:text-lg' : 'text-sm sm:text-base'
        }`} itemProp="description">{item.description}</p>
      </div>

      {item.sections && (
        <div className="space-y-5 mt-5 mb-6 sm:space-y-6 sm:mt-6 sm:mb-8">
          {item.sections.map((section, index) => {
            const isBoxSection = section.title?.toLowerCase().includes('box options') ||
                                section.title?.toLowerCase().includes('available')

            if (isBoxSection) {
              return (
                <div key={index} className={`rounded-lg ${
                  isBoxOption ? 'bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 p-4 border-2 border-[#D4AF37]/30 sm:p-8' : 'bg-gray-50 p-4 sm:p-6'
                }`}>
                  <h4 className={`font-montserrat font-semibold text-[#D4AF37] mb-4 border-b border-gray-200 pb-3 sm:mb-5 ${
                    isBoxOption ? 'text-base sm:text-lg' : 'text-base'
                  }`}>
                    {section.title}
                  </h4>
                  <div className="space-y-4">
                    <p className={`text-gray-600 mb-4 ${
                      isBoxOption ? 'text-sm leading-relaxed sm:text-base' : 'text-sm leading-relaxed'
                    }`}>
                      {t('menu.boxOptions.selectionHeader')}
                    </p>

                    <div className="sticky top-20 z-20 rounded-xl border border-[#D4AF37]/25 bg-white/90 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-500 sm:static sm:p-4 sm:shadow-sm">
                      <div className="mb-3 flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="whitespace-nowrap font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A6D1D] sm:text-xs sm:tracking-[0.24em]">
                            Selection progress
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {maxPerBox ? `${totalBoxItems} of ${maxPerBox} reserved` : `${totalBoxItems} selected`}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#8A6D1D]">
                          {maxReached ? 'Limit secured' : totalBoxItems > 0 ? 'In progress' : 'Ready'}
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full w-full origin-left transform-gpu rounded-full bg-gradient-to-r from-[#8A6D1D] via-[#D4AF37] to-[#F2D675] transition-transform duration-700 ease-out will-change-transform [backface-visibility:hidden]"
                          style={{ transform: `scaleX(${boxProgressPercent / 100})` }}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-2">
                        {selectionPhases.map((phase, phaseIndex) => (
                          <div
                            key={phase.label}
                            className={`min-w-0 rounded-lg border px-1.5 py-2 text-center transition-all duration-500 will-change-transform [backface-visibility:hidden] sm:px-3 ${
                              phase.active
                                ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#8A6D1D] shadow-sm'
                                : 'border-slate-200 bg-slate-50 text-slate-400'
                            }`}
                          >
                            <span className="block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px] sm:tracking-[0.2em]">
                              Step {phaseIndex + 1}
                            </span>
                            <span className="mt-1 block truncate font-montserrat text-xs font-semibold">
                              {phase.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Box Selection */}
                    <div className="grid gap-4">
                      {(() => {
                        const sortedItems = [...(section.items || [])].sort((a, b) => {
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
                            <div key={itemIndex} className={`flex flex-col gap-3 rounded-xl border transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                              currentQty > 0
                                ? 'border-[#D4AF37]/60 bg-white shadow-md ring-1 ring-[#D4AF37]/15'
                                : 'border-slate-200 bg-white hover:border-[#D4AF37]/30 hover:shadow-sm'
                            } ${isBoxOption ? 'p-4' : 'p-3'}`}>
                              <span className={`font-medium flex-1 transition-colors duration-300 ${
                                currentQty > 0 ? 'text-slate-950' : 'text-gray-700'
                              } ${isBoxOption ? 'text-base' : 'text-sm'}`}>
                                {boxItem}
                              </span>
                              <div className="flex w-full flex-wrap items-center gap-2 sm:ml-4 sm:w-auto sm:flex-nowrap">
                                <Button
                                  aria-label={`Decrease ${boxItem} quantity`}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBoxSelectionChange(boxItem, Math.max(0, currentQty - 1))}
                                  className="h-11 w-11 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white sm:h-9 sm:w-9"
                                  disabled={currentQty === 0}
                                >
                                  <Minus className={isBoxOption ? 'h-4 w-4' : 'h-3 w-3'} />
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
                                  className="h-11 w-14 text-center text-sm border-[#D4AF37] focus:ring-[#D4AF37] sm:h-10 sm:w-14"
                                  min="0"
                                  max={maxPerBox ? Math.max(0, maxPerBox - (totalBoxItems - currentQty)) : 99}
                                />
                                <Button
                                  aria-label={`Increase ${boxItem} quantity`}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBoxSelectionChange(boxItem, currentQty + 1)}
                                  className="h-11 w-11 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white disabled:opacity-50 sm:h-9 sm:w-9"
                                  disabled={!!maxPerBox && totalBoxItems >= maxPerBox}
                                >
                                  <Plus className={isBoxOption ? 'h-4 w-4' : 'h-3 w-3'} />
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
                                  className="min-w-[180px] flex-1 basis-full border-gray-300 text-sm focus:ring-[#D4AF37] sm:ml-2 sm:basis-auto"
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
                        <Button variant="ghost" size="sm" onClick={() => setBoxSelections([])} className="text-slate-500 hover:text-[#8A6D1D]">
                          {t('menu.boxOptions.clearSelections')}
                        </Button>
                      </div>
                    )}

                    {/* Selection Summary */}
                    {boxSelections.length > 0 && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-white shadow-sm transition-all duration-500">
                        <div className="h-1 bg-gradient-to-r from-[#8A6D1D] via-[#D4AF37] to-[#F2D675]" />
                        <div className="flex items-center justify-between gap-3 p-4">
                          <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D1D]">
                            {t('menu.boxOptions.selectedItemsLabel')}
                          </span>
                          <Badge variant="secondary" className="border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#8A6D1D] shadow-none">
                            {totalBoxItems} {tp('menu.boxOptions.item', totalBoxItems)}
                          </Badge>
                        </div>
                        {maxPerBox && (
                          <div className="mx-4 mb-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                            {t('menu.boxOptions.chooseUpTo')} {maxPerBox}
                            {maxReached && (
                              <span className="ml-2 font-semibold text-[#8A6D1D]">
                                · {t('menu.boxOptions.reachedMax')} {maxPerBox}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="space-y-2 px-4 pb-4">
                          {boxSelections.map((selection, idx) => (
                            <div key={idx} className="flex justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                              <span>{selection.itemName}{selection.note ? ` (Note: ${selection.note})` : ''}</span>
                              <span className="font-semibold text-[#8A6D1D]">×{selection.quantity}</span>
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
                    {(section.items || []).map((listItem, itemIndex) => (
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
      <div className="border-t border-gray-200 pt-5 space-y-4 sm:pt-6">
        {/* Quantity Selector - Only show for regular menu items, not Box Options */}
        {!isBoxOptionsItem && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {t('menu.boxOptions.quantityLabel')}
            </span>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-11 w-11 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white sm:h-8 sm:w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="h-11 w-16 text-center border-[#D4AF37] focus:ring-[#D4AF37] sm:h-10"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-11 w-11 p-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white sm:h-8 sm:w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Special Notes - Only show for regular menu items, not Box Options */}
        {!isBoxOptionsItem && (
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
        )}

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
          className={`relative w-full overflow-hidden border backdrop-blur-md transition-all duration-500 sticky bottom-3 z-30 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] sm:static sm:bottom-auto sm:z-auto sm:shadow-sm ${
            isAdded
              ? 'border-[#D4AF37]/60 bg-slate-950 text-[#F5E6B3] shadow-[0_16px_40px_rgba(15,23,42,0.22)] hover:bg-slate-900'
              : 'border-[#D4AF37] bg-[#D4AF37] text-white shadow-sm hover:bg-[#B69121] hover:border-[#B69121] hover:shadow-lg'
          } ${isBoxOptionsItem && totalBoxItems === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className={`absolute inset-0 transform-gpu bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.32),transparent)] transition-transform duration-700 will-change-transform [backface-visibility:hidden] ${
            isAdded ? 'translate-x-full' : '-translate-x-full'
          }`} />
          <span className="relative flex items-center justify-center">
            {isAdded ? (
              <span className="mr-3 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
            ) : (
              <ShoppingCart className="h-4 w-4 mr-2" />
            )}
            <span className="font-montserrat text-sm font-semibold uppercase tracking-[0.12em]">
              {addButtonLabel}
            </span>
          </span>
        </Button>
        {inlineConfirm && (
          <div className="mt-3 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3 text-center font-open-sans text-xs uppercase tracking-[0.18em] text-[#F5E6B3] shadow-lg transition-all duration-500">
            {t('menu.boxOptions.inlineAdded')}
          </div>
        )}
      </div>
    </article>
  )
}