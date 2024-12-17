"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
	_id: string;
	rating: number;
	product: string;
	comment: string;
	user: {
		username: string;
		email: string;
	};
	createdAt: string;
}

export default function RecentReviews({ productId }: { productId: string }) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProductReviews = async (id: string) => {
			try {
				const response = await fetch(`/api/reviews/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch product reviews");
				}
				const data = await response.json();
				return data.reviews;
			} catch (err) {
				console.error("Error fetching product reviews:", err);
				setError("Failed to load reviews. Please try again later.");
				return [];
			}
		};

		const loadReviews = async () => {
			setLoading(true);
			const fetchedReviews = await fetchProductReviews(productId);
			setReviews(fetchedReviews);
			setLoading(false);
		};

		loadReviews();
	}, [productId]);

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Recent Reviews</h2>

			{loading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((index) => (
						<Card key={index}>
							<CardContent className="p-4 space-y-4">
								<div className="flex justify-between items-start">
									<div>
										<Skeleton className="h-4 w-24 mb-2" />
										<div className="flex space-x-2">
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-4 rounded-full" />
										</div>
									</div>
									<Skeleton className="h-4 w-16" />
								</div>
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-3/4" />
							</CardContent>
						</Card>
					))}
				</div>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : reviews.length > 0 ? (
				reviews.map((review) => (
					<Card key={review._id}>
						<CardContent className="p-4">
							<div className="flex justify-between items-start">
								<div>
									<p className="font-semibold">{review.user.username}</p>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className={`w-4 h-4 ${
													star <= review.rating
														? "text-yellow-400 fill-current"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
								</div>
								<p className="text-sm text-muted-foreground">
									{new Date(review.createdAt).toLocaleDateString()}
								</p>
							</div>
							<p className="mt-2">{review.comment}</p>
						</CardContent>
					</Card>
				))
			) : (
				<p className="text-muted-foreground">No reviews found for this product.</p>
			)}
		</div>
	);
}
