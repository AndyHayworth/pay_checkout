'use client'

import Logo from './Logo'
import SubscriptionSelector from './SubscriptionSelector'
import PriceBreakdown from './PriceBreakdown'
import { Button } from '@/components/ui/button'

interface OrderDetailsProps {
  onContinue?: () => void
  subscriptionType: string
  onSubscriptionChange: (type: string) => void
}

export default function OrderDetails({ onContinue, subscriptionType, onSubscriptionChange }: OrderDetailsProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-0 md:px-4 lg:px-6 mx-0">
      <div className="flex-col items-start text-left px-4 md:px-0 w-full md:w-auto">
        <Logo />
        <div className="w-full">
          <SubscriptionSelector 
            selectedPlan={subscriptionType} 
            onPlanChange={onSubscriptionChange} 
          />
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Order Details</h2>
        <PriceBreakdown subscriptionType={subscriptionType} className="w-full text-left" />
        {onContinue && (
          <Button onClick={onContinue} className="mt-8 w-full md:hidden">
            Continue to Payment
          </Button>
        )}
      </div>
    </div>
  )
}
