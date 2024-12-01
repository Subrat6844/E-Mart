import { CartItems } from "./CartItem";
import { CartSummary } from "./Summary";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 my-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CartItems />
        </div>
        <div className="lg:col-span-2">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

