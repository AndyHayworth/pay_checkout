'use client'

import { Separator } from '@/components/ui/separator'

interface PriceBreakdownProps {
  subscriptionType: string
  className?: string
}

export default function PriceBreakdown({ subscriptionType, className }: PriceBreakdownProps) {
  const monthlyPrice = 4.99
  const yearlyPrice = monthlyPrice * 12 * 0.8 // 20% discount
  const currentPrice = subscriptionType === 'yearly' ? yearlyPrice : monthlyPrice
  const tax = currentPrice * 0.1 // Assuming 10% tax rate
  const total = currentPrice + tax

  return (
    <div className={`space-y-4 ${className} text-center`}>
      <div className="flex justify-between items-center">
        <span className="font-medium text-left">Sola Express Subscription</span>
        <span className="font-bold text-xl text-right">
          $ {currentPrice.toFixed(2)} {subscriptionType === 'yearly' ? '/year' : '/mo'}
        </span>
      </div>
      <div className="text-sm text-gray-600 text-left">
        {subscriptionType === 'yearly' 
          ? `Yearly Subscription Billed as  $ ${yearlyPrice.toFixed(2)}  per year`
          : `Monthly Subscription Billed as  $ ${monthlyPrice.toFixed(2)}  every 4 weeks`
        }
      </div>
      {subscriptionType === 'yearly' && (
        <div className="text-sm text-green-600 text-left">
          You save  $ {(monthlyPrice * 12 - yearlyPrice).toFixed(2)}  per year!
        </div>
      )}
      <div className="flex justify-between items-center text-sm">
        <span className="text-left">Tax</span>
        <span className="text-right">$ {tax.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between items-center font-bold">
        <span className="text-left">Total Due</span>
        <span className="text-right">$ {total.toFixed(2)}</span>
      </div>
    </div>
  )
}
