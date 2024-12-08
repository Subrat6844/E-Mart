'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface Address {
  _id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  type: "billing" | "shipping";
}

// Mock function to fetch addresses (replace with actual API call)
const fetchAddresses = async (): Promise<Address[]> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      _id: '1',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      type: 'shipping'
    },
    {
      _id: '2',
      addressLine1: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
      type: 'billing'
    },
    {
      _id: '3',
      addressLine1: '789 Oak Ave',
      addressLine2: 'Suite 300',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601',
      type: 'shipping'
    }
  ];
}

// Mock function to save a new address (replace with actual API call)
const saveAddress = async (address: Omit<Address, '_id'>): Promise<Address> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...address, _id: Date.now().toString() };
}

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, '_id'>>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    type: 'shipping',
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAddresses().then(fetchedAddresses => {
      setAddresses(fetchedAddresses);
      setIsLoading(false);
    });
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const savedAddress = await saveAddress(newAddress);
    setAddresses(prev => [...prev, savedAddress]);
    setSelectedAddressId(savedAddress._id);
    setIsLoading(false);
  };

  const handleProceedToPayment = () => {
    if (selectedAddressId) {
      router.push('/payment'); // Redirect to payment page
    } else {
      alert('Please select an address or add a new one.');
    }
  };

  if (isLoading) {
    return (
      <div className=" container lg:max-w-[80%] mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container lg:max-w-[80%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {addresses.length > 0 ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Select a shipping address</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map(address => (
                  <div key={address._id} className="flex items-start space-x-2 p-2 border rounded">
                    <RadioGroupItem value={address._id} id={address._id} className="mt-1" />
                    <Label htmlFor={address._id} className="flex-grow">
                      <div className="font-medium">{address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address</div>
                      <div>{address.addressLine1}</div>
                      {address.addressLine2 && <div>{address.addressLine2}</div>}
                      <div>{address.city}, {address.state} {address.postalCode}</div>
                      <div>{address.country}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>No Saved Addresses</CardTitle>
            <CardDescription>Please add a new address below</CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Add New Address</CardTitle>
          <CardDescription>Fill in the details for a new shipping address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" name="addressLine1" required value={newAddress.addressLine1} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input id="addressLine2" name="addressLine2" value={newAddress.addressLine2} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required value={newAddress.city} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" required value={newAddress.state} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required value={newAddress.country} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" name="postalCode" required value={newAddress.postalCode} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Address Type</Label>
                <Select name="type" value={newAddress.type} onValueChange={(value: "billing" | "shipping") => setNewAddress(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select address type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">Add Address</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleProceedToPayment} className="w-full">
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

