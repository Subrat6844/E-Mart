import Image from "next/image";
import { Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/context/ProductContext";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const {
    name,
    description,
    price,
    images,
    category,
    status,
    avgRating,
    reviewCount,
    variants,
  } = product;

  const isOutOfStock = variants.every((v) => v.stock === 0);

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-1 left-1 flex gap-1">
            <Badge variant={status === "active" ? "default" : "secondary"} className="text-xs py-0">
              {status}
            </Badge>
            {isOutOfStock && <Badge variant="destructive" className="text-xs py-0">Out of Stock</Badge>}
          </div>
        </div>
        <CardContent className="p-3">
          <div className="text-xs text-muted-foreground mb-1">
            {category.name}
          </div>
          <h2 className="text-base font-semibold text-foreground mb-1 line-clamp-1">
            {name}
          </h2>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">
              ₹{price.toFixed(2)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(avgRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

