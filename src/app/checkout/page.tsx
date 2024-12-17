'use client'

import { useState } from 'react'
import AddressSection from '@/components/AddressSection'
import OrderSummary from '@/components/OrderSummary'
import PaymentSection from '@/components/PaymentSection'
import { Button } from '@/components/ui/button'
import { Address } from '@/context/OrderContext'


export default function Checkout() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    address: Address | null,
    paymentMethod: string | null,
  }>({
    address: null,
    paymentMethod: null,
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const updateFormData = (key: 'address' | 'paymentMethod', value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const isStepComplete = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.address !== null
      case 2:
        return true // Order summary is always complete
      case 3:
        return formData.paymentMethod !== null
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Checkout</h1>
      <div className="space-y-8">
        {step === 1 && (
          <AddressSection
            onAddressSelect={(address) => updateFormData('address', address)}
          />
        )}
        {step === 2 && (
          <OrderSummary />
        )}
        {step === 3 && (
          <PaymentSection
            onPaymentMethodSelect={(method) => updateFormData('paymentMethod', method)}
          />
        )}
        <div className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" className="dark:bg-gray-800 dark:text-gray-200">Previous</Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} disabled={!isStepComplete(step)} className="dark:bg-blue-600 dark:text-white">Next</Button>
          ) : (
            <Button onClick={() => console.log('Place Order', formData)} disabled={!isStepComplete(step)} className="dark:bg-blue-600 dark:text-white">Place Order</Button>
          )}
        </div>
      </div>
    </div>
  )
}

