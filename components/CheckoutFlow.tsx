'use client'

import { useState } from 'react'
import OrderDetails from './OrderDetails'
import PaymentDetails from './PaymentDetails'

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState('order')
  const [subscriptionType, setSubscriptionType] = useState('monthly')

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className={`md:w-1/2 bg-blue-50 ${currentStep === 'payment' ? 'hidden md:block' : ''}`}>
        <OrderDetails 
          onContinue={() => setCurrentStep('payment')} 
          subscriptionType={subscriptionType}
          onSubscriptionChange={setSubscriptionType}
        />
      </div>
      <div className={`md:w-1/2 bg-white ${currentStep === 'order' ? 'hidden md:block' : ''} md:flex md:justify-start`}>
        <PaymentDetails onBack={() => setCurrentStep('order')} />
      </div>
    </div>
  )
}

