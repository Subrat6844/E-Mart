"use client";
import { useState } from "react";
import {
	ChevronLeft,
	ChevronRight,
	Star,
	Minus,
	Plus,
	ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductPage() {
	const [currentImage, setCurrentImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const images = [
		"/placeholder.svg?height=600&width=600",
		"/placeholder.svg?height=600&width=600&text=Image+2",
		"/placeholder.svg?height=600&width=600&text=Image+3",
		"/placeholder.svg?height=600&width=600&text=Image+4",
	];

	const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
	const prevImage = () =>
		setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-8 md:grid-cols-2">
				{/* Image Gallery */}
				<div className="relative">
					<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
						<img
							src={images[currentImage]}
							alt={`Product image ${currentImage + 1}`}
							className="h-full w-full object-cover"
						/>
					</div>
					<Button
						variant="outline"
						size="icon"
						className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80"
						onClick={prevImage}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80"
						onClick={nextImage}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<div className="mt-4 flex justify-center gap-2">
						{images.map((_, index) => (
							<Button
								key={index}
								variant={currentImage === index ? "default" : "outline"}
								size="icon"
								className="h-2 w-2 rounded-full p-0"
								onClick={() => setCurrentImage(index)}
							>
								<span className="sr-only">View image {index + 1}</span>
							</Button>
						))}
					</div>
				</div>

				{/* Product Details */}
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">Premium Blue Sneakers</h1>
					<div className="flex items-center gap-2">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-5 w-5 ${
										i < 4
											? "fill-yellow-400 text-yellow-400"
											: "fill-gray-200 text-gray-200"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-600">(42 reviews)</span>
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold">$89.99</span>
						<span className="text-sm text-gray-500 line-through">$119.99</span>
						<span className="text-sm font-semibold text-green-600">
							25% off
						</span>
					</div>
					<p className="text-gray-700">
						Experience ultimate comfort and style with our Premium Blue
						Sneakers. Crafted with high-quality materials and designed for both
						casual and athletic use, these sneakers are perfect for any
						occasion.
					</p>
					<Card>
						<CardContent className="p-4">
							<h3 className="mb-2 text-lg font-semibold">Key Features</h3>
							<ul className="list-inside list-disc space-y-1 text-gray-700">
								<li>Breathable mesh upper</li>
								<li>Cushioned insole for all-day comfort</li>
								<li>Durable rubber outsole</li>
								<li>Available in sizes 6-13</li>
							</ul>
						</CardContent>
					</Card>
					<div className="flex items-center gap-4">
						<span className="font-semibold">Quantity:</span>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="icon"
								onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
							>
								<Minus className="h-4 w-4" />
							</Button>
							<span className="w-8 text-center">{quantity}</span>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setQuantity((prev) => prev + 1)}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<Button className="mt-4 w-full">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
