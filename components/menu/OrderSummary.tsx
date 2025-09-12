"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Mail, ShoppingBag } from 'lucide-react'
import { MenuItem } from '@/lib/data/menu-data'

export interface OrderItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
  id: string;
  boxSelections?: BoxSelection[];
}

interface BoxSelection {
  itemName: string;
  quantity: number;
  note?: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
}

export const OrderSummary = ({ orderItems, onRemoveItem, onClearOrder }: OrderSummaryProps) => {
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false)

  const totalItems = orderItems.reduce((sum, orderItem) => sum + orderItem.quantity, 0)

  const generateEmailDraft = () => {
    setIsGeneratingEmail(true)
    
    const subject = `Aviation Catering Order Request - ${new Date().toLocaleDateString()}`
    
    let body = `Dear Atikis Minnesota Aviation Catering Team,

I would like to place an order for the following items:

ORDER DETAILS:
=============

`

    orderItems.forEach((orderItem, index) => {
      body += `${index + 1}. ${orderItem.item.title}
   Number of Boxes: ${orderItem.quantity}
   Category: ${orderItem.item.category}
   Description: ${orderItem.item.description}`
      
      if (orderItem.boxSelections && orderItem.boxSelections.length > 0) {
        body += `
   Box Selections (per box):`
        orderItem.boxSelections.forEach(selection => {
          body += `
     - ${selection.itemName}: ${selection.quantity} each (total ${selection.quantity * orderItem.quantity})${selection.note ? ` (Note: ${selection.note})` : ''}`
        })
      }
      
      if (orderItem.notes) {
        body += `
   Special Notes: ${orderItem.notes}`
      }
      
      body += `

`
    })

    body += `TOTAL ITEMS: ${totalItems}

ADDITIONAL INFORMATION:
======================
Wheels Up: [Please specify]
Flight Date: [Please specify]
Delivery Time: [Please specify]
Delivery Location: [Please specify airport/FBO]
Number of Passengers: [Please specify]
Special Dietary Requirements: [Please specify if any]

Please confirm availability and provide pricing for this order.

Thank you for your service!

Best regards,
[Your Name]
[Your Contact Information]`

    const mailtoLink = `mailto:order@atikismn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    window.location.href = mailtoLink
    
    setTimeout(() => setIsGeneratingEmail(false), 1000)
  }

  if (orderItems.length === 0) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No items selected yet. Browse our menu and add items to your order.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Order
          </div>
          <Badge variant="secondary" className="bg-[#D4AF37] text-white">
            {totalItems} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-96 overflow-y-auto space-y-3">
          {orderItems.map((orderItem) => (
            <div key={orderItem.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm leading-tight">{orderItem.item.title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(orderItem.id)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>Number of Boxes: {orderItem.quantity}</span>
                <Badge variant="outline" className="text-xs">
                  {orderItem.item.category}
                </Badge>
              </div>
              {orderItem.boxSelections && orderItem.boxSelections.length > 0 && (
                <div className="mt-2 bg-white border rounded p-2 text-xs">
                  <div className="font-medium mb-1">Box Selections (per box):</div>
                  <ul className="space-y-1">
                    {orderItem.boxSelections.map((sel, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{sel.itemName}{sel.note ? ` (Note: ${sel.note})` : ''}</span>
                        <span>×{sel.quantity} each (total ×{sel.quantity * orderItem.quantity})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {orderItem.notes && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  Note: {orderItem.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-3">
          <Button
            onClick={generateEmailDraft}
            disabled={isGeneratingEmail}
            className="w-full bg-[#D4AF37] hover:bg-[#B69121] text-white"
          >
            <Mail className="h-4 w-4 mr-2" />
            {isGeneratingEmail ? 'Generating Email...' : 'Send Order via Email'}
          </Button>
          
          <Button
            onClick={onClearOrder}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            Clear Order
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Clicking &quot;Send Order via Email&quot; will open your email client with a pre-filled order summary.
        </div>
      </CardContent>
    </Card>
  )
}