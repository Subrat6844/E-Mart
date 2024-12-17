import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingCart className="h-24 w-24 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-4">Looks like you haven&apos;t added any items to your cart yet.</p>
      <Link href="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )
}
