'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
interface PaymentSectionProps {
  onPaymentMethodSelect: (method: string) => void
}

export default function PaymentSection({ onPaymentMethodSelect }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState('')

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    onPaymentMethodSelect(value)
  }

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-gray-100">Select Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={handlePaymentMethodChange} value={paymentMethod}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="dark:text-gray-300">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="debitCard" id="debitCard" />
            <Label htmlFor="debitCard" className="dark:text-gray-300">Debit Card</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="netBanking" id="netBanking" />
            <Label htmlFor="netBanking" className="dark:text-gray-300">Net Banking</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="dark:text-gray-300">UPI</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
            <Label htmlFor="cashOnDelivery" className="dark:text-gray-300">Cash on Delivery</Label>
          </div>
        </RadioGroup>
        {(paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && (
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="dark:text-gray-300">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="dark:bg-gray-700 dark:text-gray-200" />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <Label htmlFor="expiryDate" className="dark:text-gray-300">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" className="dark:bg-gray-700 dark:text-gray-200" />
              </div>
              <div className="w-1/2">
                <Label htmlFor="cvv" className="dark:text-gray-300">CVV</Label>
                <Input id="cvv" placeholder="123" className="dark:bg-gray-700 dark:text-gray-200" />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === 'netBanking' && (
          <div className="mt-4">
            <Label htmlFor="bank" className="dark:text-gray-300">Select Bank</Label>
            <select id="bank" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
              <option>Select a bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
          </div>
        )}
        {paymentMethod === 'upi' && (
          <div className="mt-4">
            <Label htmlFor="upiId" className="dark:text-gray-300">UPI ID</Label>
            <Input id="upiId" placeholder="username@upi" className="dark:bg-gray-700 dark:text-gray-200" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

