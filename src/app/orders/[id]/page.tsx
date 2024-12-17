"use client";

import { useEffect, useState } from "react";
import { Order, OrderItem } from "@/context/OrderContext"; // Adjust the import path as needed
import { useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OrderDetailsSkeleton } from "@/components/OrderDetailsSkeleton";
import { EmptyOrder } from "@/components/OrderNotFound";
import { Star, Trash2, Edit } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface Review {
	_id: string;
	rating: number;
	comment: string;
	user: {
		_id: string;
		username: string;
		email: string;
	};
}

interface ProductWithReview extends Omit<OrderItem["product"], "price"> {
	review: Review | null;
	price: number; // We need to include this explicitly as it's part of OrderItem, not OrderItem['product']
}

export default function OrderDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;
	const { state } = useOrder();
	const [order, setOrder] = useState<Order | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductWithReview[]>([]);
	const { toast } = useToast();
	const { data: session } = useSession();

	useEffect(() => {
		const fetchOrder = async () => {
			setIsLoading(true);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			const foundOrder = state.orders.find((o) => o._id === id) || null;
			setOrder(foundOrder);

			if (foundOrder) {
				const productsWithReviews = await Promise.all(
					foundOrder.items.map(async (item) => {
						const response = await fetch(
							`/api/reviews/${item.product._id}/${session?.user._id}`
						);
						const data = await response.json();
						const review =
							data.reviews && data.reviews.length > 0 ? data.reviews[0] : null;
						return {
							...item.product,
							review,
							price: item.price, // Added price here
						};
					})
				);
				setProducts(productsWithReviews);
			}

			setIsLoading(false);
		};

		fetchOrder();
	}, [id, state.orders]);

	const handleAddReview = async (
		productId: string,
		review: Omit<Review, "_id" | "user">
	) => {
		try {
			const response = await fetch(`/api/reviews/${productId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(review),
			});

			if (!response.ok) {
				throw new Error("Failed to add review");
			}

			const data = await response.json();
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product._id === productId
						? { ...product, review: data.review }
						: product
				)
			);
			toast({
				title: "Review added",
				description: "Your review has been successfully added.",
			});
		} catch (error) {
			console.error("Error adding review:", error);
			toast({
				title: "Error",
				description: "Failed to add review. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleUpdateReview = async (
		productId: string,
		reviewId: string,
		updatedReview: Omit<Review, "_id" | "user">
	) => {
		try {
			const response = await fetch(`/api/reviews/${productId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedReview),
			});

			if (!response.ok) {
				throw new Error("Failed to update review");
			}

			const data = await response.json();
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product._id === productId
						? { ...product, review: data.review }
						: product
				)
			);
			toast({
				title: "Review updated",
				description: "Your review has been successfully updated.",
			});
		} catch (error) {
			console.error("Error updating review:", error);
			toast({
				title: "Error",
				description: "Failed to update review. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleDeleteReview = async (productId: string) => {
		try {
			const response = await fetch(`/api/reviews/${productId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete review");
			}

			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product._id === productId ? { ...product, review: null } : product
				)
			);
			toast({
				title: "Review deleted",
				description: "Your review has been successfully deleted.",
			});
		} catch (error) {
			console.error("Error deleting review:", error);
			toast({
				title: "Error",
				description: "Failed to delete review. Please try again.",
				variant: "destructive",
			});
		}
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<OrderDetailsSkeleton />
			</div>
		);
	}

	if (!order) {
		return <EmptyOrder />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="w-full max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
						<span>Order #{order._id}</span>
						<Badge
							variant={order.status === "pending" ? "secondary" : "default"}
						>
							{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold mb-2">Shipping Address</h3>
							<p>{order.address.addressLine1}</p>
							{order.address.addressLine2 && (
								<p>{order.address.addressLine2}</p>
							)}
							<p>
								{order.address.city}, {order.address.state}{" "}
								{order.address.postalCode}
							</p>
							<p>{order.address.country}</p>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Order Summary</h3>
							<p>Total: ${order.total.toFixed(2)}</p>
							<p>Payment Status: {order.paymentStatus}</p>
							<p>Payment Provider: {order.paymentProvider}</p>
							<p>Transaction ID: {order.paymentTransactionId}</p>
							<p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
							<p>Last Updated: {new Date(order.updatedAt).toLocaleString()}</p>
						</div>
					</div>
					<div className="mt-6">
						<h3 className="font-semibold mb-4">Items</h3>
						<div className="space-y-4">
							{order.items.map((item) => {
								const productWithReview = products.find(
									(p) => p._id === item.product._id
								);
								return (
									<div
										key={item.product._id}
										className="flex justify-between items-center border-b pb-4 last:border-b-0"
									>
										<div className="flex items-center space-x-4">
											<img
												src={item.product.images[0]}
												alt={item.product.name}
												className="w-16 h-16 object-cover rounded"
											/>
											<div>
												<p className="font-medium">{item.product.name}</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity}
													{item.size && ` | Size: ${item.size}`}
												</p>
												<p className="text-sm text-gray-600">
													Price: ${item.price.toFixed(2)}
												</p>
											</div>
										</div>
										<div className="flex flex-col items-end">
											<p className="font-medium mb-2">
												${item.total.toFixed(2)}
											</p>
											{productWithReview?.review ? (
												<div className="flex items-center space-x-2">
													<div className="flex">
														{[1, 2, 3, 4, 5].map((star) => (
															<Star
																key={star}
																className={`h-4 w-4 ${
																	star <= productWithReview.review!.rating
																		? "text-yellow-400"
																		: "text-gray-300"
																}`}
																fill="currentColor"
															/>
														))}
													</div>
													<ReviewDialog
														productId={item.product._id}
														existingReview={productWithReview.review}
														onAddReview={handleAddReview}
														onUpdateReview={handleUpdateReview}
													/>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleDeleteReview(item.product._id)}
													>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Delete review</span>
													</Button>
												</div>
											) : (
												<ReviewDialog
													productId={item.product._id}
													onAddReview={handleAddReview}
												/>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function ReviewDialog({
	productId,
	existingReview,
	onAddReview,
	onUpdateReview,
}: {
	productId: string;
	existingReview?: Review | null;
	onAddReview: (
		productId: string,
		review: Omit<Review, "_id" | "user">
	) => void;
	onUpdateReview?: (
		productId: string,
		reviewId: string,
		review: Omit<Review, "_id" | "user">
	) => void;
}) {
	const [rating, setRating] = useState(existingReview?.rating || 0);
	const [comment, setComment] = useState(existingReview?.comment || "");

	const handleSubmit = () => {
		if (existingReview && onUpdateReview) {
			onUpdateReview(productId, existingReview._id, { rating, comment });
		} else {
			onAddReview(productId, { rating, comment });
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					{existingReview ? <Edit className="h-4 w-4" /> : "Add Review"}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{existingReview ? "Edit Review" : "Add Review"}
					</DialogTitle>
					<DialogDescription>
						Share your thoughts about this product.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center justify-center space-x-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`h-6 w-6 cursor-pointer ${
									star <= rating ? "text-yellow-400" : "text-gray-300"
								}`}
								fill="currentColor"
								onClick={() => setRating(star)}
							/>
						))}
					</div>
					<Textarea
						placeholder="Write your review here..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>
				<div className="flex justify-end">
					<Button
						onClick={handleSubmit}
						disabled={rating === 0 || comment.trim() === ""}
					>
						{existingReview ? "Update Review" : "Submit Review"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
