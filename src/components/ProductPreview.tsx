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

export function ProductPreview({ product }: { product: Product }) {
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState("");

	const totalStock = useMemo(
		() => product.variants.reduce((sum, variant) => sum + variant.stock, 0),
		[product.variants]
	);

	const isOutOfStock = product.status === "inactive" || totalStock === 0;

	return (
		<div className="container mx-auto px-4 py-8 dark:bg-gray-900 max-w-6xl">
			<div className="grid md:grid-cols-2 gap-12">
				<div className="space-y-4">
					<div className="relative aspect-square overflow-hidden rounded-lg">
						<Image
							src={product.images[selectedImage] || "/placeholder.svg"}
							alt={product.name}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div className="flex space-x-2 overflow-x-auto">
						{product.images.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImage(index)}
								className={`relative w-16 h-16 rounded-md overflow-hidden ${
									selectedImage === index ? "ring-2 ring-primary" : ""
								}`}
							>
								<Image
									src={image || "/placeholder.svg"}
									alt={`${product.name} thumbnail ${index + 1}`}
									fill
									className="object-cover"
									sizes="80px"
								/>
							</button>
						))}
					</div>
				</div>
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-muted-foreground">{product.category.name}</p>
					</div>
					<div className="flex items-center space-x-2">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-5 h-5 ${
										i < Math.floor(product.avgRating)
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-muted-foreground">
							{product.avgRating.toFixed(1)} ({product.reviewCount} reviews)
						</span>
					</div>
					<p className="text-3xl font-bold">₹{product.price.toFixed(2)}</p>
					<Badge
						variant={isOutOfStock ? "destructive" : "success"}
						className="text-sm"
					>
						{isOutOfStock ? "Out of Stock" : "In Stock"}
					</Badge>
					<p className="text-muted-foreground">{product.description}</p>
					<div>
						<h3 className="font-semibold mb-2">Size</h3>
						<RadioGroup
							onValueChange={setSelectedSize}
							className="flex flex-wrap gap-2"
						>
							{product.variants.map((variant) => (
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
					<Button className="w-full" disabled={isOutOfStock || !selectedSize}>
						<ShoppingCart className="mr-2 h-4 w-4" />
						{isOutOfStock ? "Out of Stock" : "Add to Cart"}
					</Button>
					<Card className="dark:bg-gray-800">
						<CardContent className="p-4 space-y-2">
							<p className="font-semibold">Product Details</p>
							<p className="text-sm text-muted-foreground">
								SKU: {product.sku}
							</p>
							<div className="flex items-center space-x-1">
								<AlertCircle className="h-4 w-4 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									{isOutOfStock
										? "This product is currently out of stock."
										: `Only ${totalStock} left in stock - order soon.`}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
