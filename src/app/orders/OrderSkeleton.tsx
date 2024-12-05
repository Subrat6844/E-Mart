import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

