'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CreditCard, Building, Apple, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface PaymentDetailsProps {
  onBack?: () => void
}

export default function PaymentDetails({ onBack }: PaymentDetailsProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card')
  const [country, setCountry] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    zip: '',
    routingNumber: '',
    accountNumber: '',
    reEnterAccountNumber: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    const requiredFields = paymentMethod === 'card'
      ? ['email', 'fullName', 'cardNumber', 'expiryDate', 'cvc', 'country']
      : ['email', 'fullName', 'routingNumber', 'accountNumber', 'reEnterAccountNumber']
    
    const isValid = requiredFields.every(field => formData[field] !== '')
      && (country !== 'US' || formData.zip !== '')
      && (paymentMethod !== 'ach' || formData.accountNumber === formData.reEnterAccountNumber)
      && (paymentMethod !== 'ach' || isAuthorized)
    
    setIsFormValid(isValid)
  }, [formData, paymentMethod, country, isAuthorized])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubscribe = () => {
    if (isFormValid) {
      router.push('/success')
    }
  }

  return (
    <div className="pt-8 pb-4 min-h-screen flex flex-col items-start px-0 md:px-4 lg:px-6 w-full">
      <div className="w-full max-w-[500px] px-0 md:px-0">
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john.doe@example.com" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input 
                id="fullName" 
                placeholder="John Doe" 
                required 
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className="h-18 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="h-8 w-8 mb-2" />
                  Card
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'ach' ? 'default' : 'outline'}
                  className="h-18 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('ach')}
                >
                  <Building className="h-8 w-8 mb-2" />
                  ACH
                </Button>
              </div>
            </div>
            {paymentMethod === 'ach' && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="authorize"
                  className="mt-1"
                  checked={isAuthorized}
                  onCheckedChange={(checked) => setIsAuthorized(checked as boolean)}
                />
                <div>
                  <label
                    htmlFor="authorize"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    You authorize Solsa to debit your bank account using ACH.
                  </label>
                  <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm text-blue-600 underline"
                      onClick={() => setIsPopupOpen(true)}
                    >
                      Please click this link to learn more
                    </Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>ACH Authorization Information</DialogTitle>
                        <Button
                          className="absolute right-4 top-4"
                          variant="ghost"
                          onClick={() => setIsPopupOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>This is placeholder text for the ACH authorization information. In a real application, this would contain detailed information about the ACH debit authorization process and its implications.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 flex items-center justify-center bg-black text-white hover:bg-gray-800"
                >
                  <Apple className="h-6 w-6 mr-2" />
                  Pay
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Or pay with credit card
                </p>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    required 
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input 
                      id="expiryDate" 
                      placeholder="MM/YY" 
                      required 
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc" 
                      placeholder="123" 
                      required 
                      value={formData.cvc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country or Region</Label>
                  <Select onValueChange={setCountry}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>
                {country === 'US' && (
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      placeholder="12345" 
                      required 
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            )}
            {paymentMethod === 'ach' && (
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input 
                  id="routingNumber" 
                  placeholder="Enter your routing number" 
                  required 
                  value={formData.routingNumber}
                  onChange={handleInputChange}
                />
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input 
                  id="accountNumber" 
                  placeholder="Enter your account number" 
                  required 
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                />
                <Label htmlFor="reEnterAccountNumber">Re-enter Account Number</Label>
                <Input 
                  id="reEnterAccountNumber" 
                  placeholder="Re-enter your account number" 
                  required 
                  value={formData.reEnterAccountNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </form>
          <Button 
            onClick={handleSubscribe}
            className={`mt-6 w-full ${isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-white cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Subscribe Now
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            By confirming your subscription, you allow ACME inc. to charge you for future payments in accordance with their terms. You can always cancel your subscription.
          </p>
          {onBack && (
            <Button variant="outline" onClick={onBack} className="mt-4 w-full md:hidden">
              Back to Order Details
            </Button>
          )}
        </div>
        <footer className="mt-8 flex justify-center items-center space-x-4 text-sm text-gray-500">
          <p>Powered by Sola</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

