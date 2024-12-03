import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function CartSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="mb-4">
            <CardContent className="flex items-center p-4">
              <Skeleton className="h-20 w-20 rounded-md mr-4" />
              <div className="flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-16 mx-2" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full ml-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

