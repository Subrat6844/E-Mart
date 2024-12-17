import { PackageX } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function EmptyOrder() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <PackageX className="h-24 w-24 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
      <p className="text-gray-600 mb-4 text-center">We couldn&apos;t find the order you&apos;re looking for. It may have been removed or doesn&apos;t exist.</p>
      <Link href="/orders">
        <Button>View All Orders</Button>
      </Link>
    </div>
  )
}

