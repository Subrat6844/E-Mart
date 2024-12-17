"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function ProductDetails({ product }: { product?: Product }) {
	const { cart, dispatch } = useCart();
	const navigate = useRouter();
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState("");
	const isAlreadyInCart = useMemo(
		() =>
			cart.items.some(
				(item) => item.product === product?._id && item.size === selectedSize
			),
		[cart, product?._id, selectedSize]
	);

	const { toast } = useToast();
	const totalStock = useMemo(
		() => product?.variants.reduce((sum, variant) => sum + variant.stock, 0),
		[product?.variants]
	);

	const isOutOfStock = product?.status === "inactive" || totalStock === 0;
	const handleAddToCart = () => {
		if (isOutOfStock) {
			return;
		}
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product: product?._id as string,
				name: product?.name as string,
				quantity: 1,
				image: product?.images[0] as string,
				price: product?.price as number,
				size: selectedSize,
			},
		});
		toast({
			title: "Product added to cart",
		});
	};
	return (
		<div className="lg:flex lg:items-center dark:bg-gray-900 lg:justify-center lg:w-[80%] lg:m-auto">
			<div className="container mx-auto px-4 py-4 ">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="relative aspect-square overflow-hidden rounded-lg">
							<Image
								src={product?.images[selectedImage] as string}
								alt={product?.name as string}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="flex space-x-2 overflow-x-auto">
							{product?.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`relative w-16 h-16 rounded-md overflow-hidden ${
										selectedImage === index ? "ring-2 ring-primary" : ""
									}`}
								>
									<Image
										src={image}
										alt={`${product?.name} thumbnail ${index + 1}`}
										fill
										className="object-cover"
										sizes="80px"
									/>
								</button>
							))}
						</div>
					</div>
					<div className="space-y-4">
						<div>
							<h1 className="text-2xl font-bold">{product?.name}</h1>
							<p className="text-muted-foreground">{product?.category.name}</p>
						</div>
						<div className="flex items-center space-x-2">
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-5 h-5 ${
											i < Math.floor(product?.avgRating as number)
												? "text-yellow-400 fill-current"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<span className="text-muted-foreground">
								{product?.avgRating.toFixed(1)} ({product?.reviewCount} reviews)
							</span>
						</div>
						<p className="text-xl font-bold">₹{product?.price.toFixed(2)}</p>
						<Badge
							variant={isOutOfStock ? "destructive" : "success"}
							className="text-sm"
						>
							{isOutOfStock ? "Out of Stock" : "In Stock"}
						</Badge>
						<p className="text-muted-foreground">{product?.description}</p>
						<div>
							<h3 className="font-semibold mb-2">Size</h3>
							<RadioGroup
								onValueChange={setSelectedSize}
								className="flex flex-wrap gap-2"
							>
								{product?.variants.map((variant) => (
									<div key={variant.size}>
										<RadioGroupItem
											value={variant.size}
											id={`size-${variant.size}`}
											className="peer sr-only"
											disabled={variant.stock === 0}
										/>
										<Label
											htmlFor={`size-${variant.size}`}
											className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											{variant.size}
										</Label>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="ml-1 text-xs text-muted-foreground">
														{variant.stock > 0 ? `(${variant.stock})` : ""}
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														{variant.stock > 0
															? `${variant.stock} in stock`
															: "Out of stock"}
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								))}
							</RadioGroup>
						</div>
						{!isAlreadyInCart ? (
							<Button
								onClick={handleAddToCart}
								className="w-full"
								disabled={isOutOfStock || !selectedSize || isAlreadyInCart}
							>
								<ShoppingCart className="mr-2 h-4 w-4" />
								{isOutOfStock ? "Out of Stock" : "Add to Cart"}
							</Button>
						) : (
							<Button
								onClick={()=> navigate.push("/cart")}
								className="w-full"
								disabled={!isAlreadyInCart}
							>
								Go to Cart
							</Button>
						)}
						<Card className="dark:bg-gray-800">
							<CardContent className="p-4 space-y-2">
								<p className="font-semibold">Product Details</p>
								<p className="text-sm text-muted-foreground">
									SKU: {product?.sku}
								</p>
								<div className="flex items-center space-x-1">
									<AlertCircle className="h-4 w-4 text-muted-foreground" />
									<p className="text-sm text-muted-foreground">
										{isOutOfStock
											? "This product? is currently out of stock."
											: `Only ${totalStock} left in stock - order soon.`}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
