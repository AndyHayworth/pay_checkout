'use client'

import dynamic from 'next/dynamic'
import OrderDetails from '@/components/OrderDetails'
import PaymentDetails from '@/components/PaymentDetails'

const DynamicCheckoutFlow = dynamic(() => import('@/components/CheckoutFlow'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
})

export default function Home() {
  // Default values for noscript fallback
  const defaultSubscriptionType = 'monthly'
  const noopHandler = () => {}

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-50 to-white">
      <div className="max-w-[1440px] mx-auto md:px-4 lg:px-6 xl:px-8">
        <noscript>
          <div className="flex flex-col md:flex-row">
            <OrderDetails 
              subscriptionType={defaultSubscriptionType}
              onSubscriptionChange={noopHandler}
            />
            <PaymentDetails onBack={noopHandler} />
          </div>
        </noscript>
        <DynamicCheckoutFlow />
      </div>
    </main>
  )
}
