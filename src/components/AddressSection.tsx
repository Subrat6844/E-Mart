'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddressCard } from './AddressCard'
import { Address } from '@/context/OrderContext'

interface AddressSectionProps {
  onAddressSelect: (address: Address) => void
}

const savedAddresses: Address[] = [
  { _id: '1', addressLine1: '123 Main St', city: 'Mumbai', state: 'Maharashtra', country: 'India', postalCode: '400001', type: 'shipping' ,createdAt:""},
  { _id: '2', addressLine1: '456 Oak Ave', addressLine2: 'Apt 4B', city: 'Delhi', state: 'Delhi', country: 'India', postalCode: '110001', type: 'billing',createdAt:"" },
]

export default function AddressSection({ onAddressSelect }: AddressSectionProps) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({ type: 'shipping' })
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  const handleNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const address: Address = {
      _id: `${savedAddresses.length + 1}`,
      ...newAddress as Address,
    }
    setSelectedAddressId(address._id)
    onAddressSelect(address)
    setShowNewAddressForm(false)
  }

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address._id)
    onAddressSelect(address)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold dark:text-gray-200">Select Delivery Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedAddresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            isSelected={selectedAddressId === address._id}
            onSelect={() => handleAddressSelect(address)}
          />
        ))}
      </div>
      {!showNewAddressForm && (
        <Button onClick={() => setShowNewAddressForm(true)}>
          Add New Address
        </Button>
      )}
      {showNewAddressForm && (
        <form onSubmit={handleNewAddressSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="addressLine1" className="dark:text-gray-200">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={newAddress.addressLine1 || ''}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                required
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="addressLine2" className="dark:text-gray-200">Address Line 2 (Optional)</Label>
              <Input
                id="addressLine2"
                value={newAddress.addressLine2 || ''}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="city" className="dark:text-gray-200">City</Label>
              <Input
                id="city"
                value={newAddress.city || ''}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="state" className="dark:text-gray-200">State</Label>
              <Input
                id="state"
                value={newAddress.state || ''}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                required
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="country" className="dark:text-gray-200">Country</Label>
              <Input
                id="country"
                value={newAddress.country || ''}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                required
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="postalCode" className="dark:text-gray-200">Postal Code</Label>
              <Input
                id="postalCode"
                value={newAddress.postalCode || ''}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                required
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button type="submit">Save & Use This Address</Button>
            <Button type="button" variant="outline" onClick={() => setShowNewAddressForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

