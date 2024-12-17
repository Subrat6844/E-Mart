import Link from 'next/link'
import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-70px)]">
      <PackageX className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
      <p className="text-muted-foreground mb-4 text-center">
        We&apos;re sorry, but the product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/products">
          Browse All Products
        </Link>
      </Button>
    </div>
  )
}

