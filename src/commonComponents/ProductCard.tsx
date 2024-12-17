import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from '@/context/ProductContext'


export default function ProductCard({ product }: { product: Product }) {
  const { name, description, price, images, category, status, avgRating, reviewCount, variants } = product

  const isOutOfStock = variants.every(v => v.stock === 0)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
          {isOutOfStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-2">{category.name}</div>
        <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-1">{name}</h2>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={isOutOfStock}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

