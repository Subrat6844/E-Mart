import { Card, CardContent } from "@/components/ui/card"

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
      </div>
      <CardContent className="p-3">
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mr-1 animate-pulse"></div>
            ))}
            <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded ml-1 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

