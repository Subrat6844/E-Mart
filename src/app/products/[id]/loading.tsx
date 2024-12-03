import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsLoader() {
  return (
    <div className="lg:flex lg:items-center lg:justify-center lg:w-[80%] lg:m-auto">
      <div className="container mx-auto px-4 py-4 dark:bg-gray-900">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex space-x-2 overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-16 h-16 rounded-md flex-shrink-0" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-5 h-5 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-20 w-full" />
            <div>
              <Skeleton className="h-6 w-16 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-12 h-10 rounded-md" />
                ))}
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2 p-4 border rounded-lg dark:bg-gray-800">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

