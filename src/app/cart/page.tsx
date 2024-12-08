"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import CartSkeleton from "./loading";
import { EmptyCart } from "@/components/EmptyCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { cart, dispatch } = useCart();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter()

	useEffect(() => {
		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const updateQuantity = (product: string, quantity: number, size?: string) => {
		if (quantity > 0) {
			dispatch({
				type: "UPDATE_QUANTITY",
				payload: { product, quantity, size },
			});
		} else {
			dispatch({ type: "REMOVE_FROM_CART", payload: { product, size } });
		}
	};

	const removeItem = (product: string, size?: string) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: { product, size } });
	};

	const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity,0);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Your Cart</h1>
				<CartSkeleton />
			</div>
		);
	}

	if (cart.items.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Your Cart</h1>
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					{cart.items.map((item) => (
						<Card key={`₹{item.product}-${item.size}`} className="mb-4">
							<CardContent className="flex flex-col sm:flex-row items-center p-4">
								<Image
									src={item.image}
									alt={item.name}
									width={80}
									height={80}
									className="rounded-md mb-4 sm:mb-0 sm:mr-4"
								/>
								<div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
									<h2 className="text-lg font-semibold">{item.name}</h2>
									{item.size && (
										<p className="text-sm text-gray-600">Size: {item.size}</p>
									)}
									<p className="text-sm text-gray-600">
										₹{item.price.toFixed(2)}
									</p>
								</div>
								<div className="flex items-center">
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											updateQuantity(item.product, item.quantity - 1, item.size)
										}
										aria-label={`Decrease quantity of ${item.name}`}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<Input
										type="number"
										value={item.quantity}
										onChange={(e) =>
											updateQuantity(
												item.product,
												parseInt(e.target.value) || 0,
												item.size
											)
										}
										className="w-16 mx-2 text-center"
										min="0"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											updateQuantity(item.product, item.quantity + 1, item.size)
										}
										aria-label={`Increase quantity of ${item.name}`}
									>
										<Plus className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeItem(item.product, item.size)}
										className="ml-2"
										aria-label={`Remove ${item.name} from cart`}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div>
					<Card className="sticky top-4">
						<CardContent className="p-4">
							<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
							<div className="flex justify-between mb-2">
								<span>Subtotal:</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							<div className="flex justify-between mb-4">
								<span>Shipping:</span>
								<span>Free</span>
							</div>
							<div className="flex justify-between font-semibold text-lg">
								<span>Total:</span>
								<span>₹{totalPrice.toFixed(2)}</span>
							</div>
							<Button onClick={()=> router.push("/checkout") } className="w-full mt-4">Proceed to Checkout</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
