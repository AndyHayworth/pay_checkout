import dynamic from 'next/dynamic'
import OrderDetails from './components/OrderDetails'
import PaymentDetails from './components/PaymentDetails'

const DynamicCheckoutFlow = dynamic(() => import('./components/CheckoutFlow'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-50 to-white">
      <div className="max-w-[1440px] mx-auto md:px-4 lg:px-6 xl:px-8">
        <noscript>
          <div className="flex flex-col md:flex-row">
            <OrderDetails />
            <PaymentDetails />
          </div>
        </noscript>
        <DynamicCheckoutFlow />
      </div>
    </main>
  )
}

