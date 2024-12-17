import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Skeleton className="h-10 w-48 mb-8" />
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-4">
					{[...Array(3)].map((_, index) => (
						<Card key={index}>
							<CardContent className="flex flex-col sm:flex-row items-center p-4 gap-4">
								<Skeleton className="w-24 h-24 rounded-md" />
								<div className="flex-grow space-y-2">
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
									<Skeleton className="h-4 w-1/4" />
								</div>
								<div className="flex items-center gap-2">
									<Skeleton className="h-10 w-10 rounded-md" />
									<Skeleton className="h-10 w-16 rounded-md" />
									<Skeleton className="h-10 w-10 rounded-md" />
									<Skeleton className="h-10 w-10 rounded-md" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div className="lg:sticky lg:top-4 lg:h-fit">
					<Card>
						<CardContent className="p-6 space-y-4">
							<Skeleton className="h-6 w-1/2" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
							</div>
							<Skeleton className="h-6 w-3/4" />
							<Skeleton className="h-10 w-full" />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

