import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderDetailsSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

