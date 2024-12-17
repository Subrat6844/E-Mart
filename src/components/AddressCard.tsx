import { Card, CardContent } from "@/components/ui/card"
import { Address } from "@/context/OrderContext";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}

export function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 dark:border-blue-400 shadow-md' : 'border-gray-200 dark:border-gray-700'
      } dark:bg-gray-800`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <p className="font-semibold dark:text-gray-200">{address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address</p>
        <p className="dark:text-gray-300">{address.addressLine1}</p>
        {address.addressLine2 && <p className="dark:text-gray-300">{address.addressLine2}</p>}
        <p className="dark:text-gray-300">{address.city}, {address.state} {address.postalCode}</p>
        <p className="dark:text-gray-300">{address.country}</p>
      </CardContent>
    </Card>
  )
}

