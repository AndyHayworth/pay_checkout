'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SubscriptionSelectorProps {
  selectedPlan: string
  onPlanChange: (plan: string) => void
}

export default function SubscriptionSelector({ selectedPlan, onPlanChange }: SubscriptionSelectorProps) {
  return (
    <Tabs value={selectedPlan} onValueChange={onPlanChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="monthly" className="text-sm">Monthly</TabsTrigger>
        <TabsTrigger value="yearly" className="text-sm">Yearly (Save 20%)</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
