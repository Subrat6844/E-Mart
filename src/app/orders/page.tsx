"use client";

import { useEffect, useState } from "react";
import { Order, useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderSkeleton } from "./OrderSkeleton";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
	const { state, dispatch } = useOrder();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Mock data - replace this with actual API call
			const mockOrder: Order = {
				_id: "153",
				user: "user1",
				status: "shipped",
				paymentStatus: "unpaid",
				paymentProvider: "stripe",
				paymentTransactionId: "tx_123",
				total: 99.99,
				address: {
					_id: "addr1",
					user: "user1",
					addressLine1: "123 Main St",
					city: "Anytown",
					state: "CA",
					country: "USA",
					postalCode: "12345",
					type: "shipping",
					createdAt: "2023-01-01T00:00:00.000Z",
				},
				items: [
					{
						product: {
							_id: "prod1",
							name: "T-Shirt",
							price: 29.99,
							images: ["https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg"],
						},
						quantity: 2,
						price: 29.99,
						total: 59.98,
					},
					{
						product: {
							_id: "prod2",
							name: "Jeans",
							price: 39.99,
							images: ["https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg"],
						},
						quantity: 1,
						price: 39.99,
						total: 39.99,
					},
				],
				createdAt: "2023-06-01T10:00:00.000Z",
				updatedAt: "2023-06-01T10:00:00.000Z",
			};
			// Add more mock orders here if needed

			dispatch({ type: "ADD_ORDER", payload: mockOrder });
			setIsLoading(false);
		};

		fetchOrders();
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Your Orders</h1>
				{[1, 2, 3].map((i) => (
					<OrderSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Your Orders</h1>
			{state.orders.length === 0 ? (
				<p className="text-xl text-center">
					You haven&apos;t placed any orders yet.
				</p>
			) : (
				state.orders.map((order) => (
					<Card key={order._id} className="mb-6">
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
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<h3 className="font-semibold mb-2">Shipping Address</h3>
									<p>{order.address.addressLine1}</p>
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
									<p>
										Order Date: {new Date(order.createdAt).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="mt-6">
								<h3 className="font-semibold mb-2">Items</h3>
								{order.items.map((item) => (
									<div
										key={item.product._id}
										className="flex items-center justify-between py-2 border-b last:border-b-0"
									>
										<div className="flex items-center">
											<Image
												src={item.product.images[0]}
												alt={item.product.name}
												className="w-16 h-16 object-cover rounded mr-4"
											/>
											<div>
												<p className="font-medium">{item.product.name}</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity}
												</p>
											</div>
										</div>
										<p>${item.total.toFixed(2)}</p>
									</div>
								))}
							</div>
							<div className="mt-6 flex justify-end">
								<Link href={`/orders/${order._id}`}>
									<Button>View Details</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	);
}
