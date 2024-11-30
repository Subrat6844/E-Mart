"use client";
import { useState } from "react";
import { Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/commonComponents/ProductCard";

const products = [
	{
		id: 1,
		name: "Purple Sneakers",
		price: 89.99,
		rating: 4,
		category: "Shoes",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 2,
		name: "Lavender T-Shirt",
		price: 29.99,
		rating: 5,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 3,
		name: "Amethyst Watch",
		price: 199.99,
		rating: 4,
		category: "Accessories",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 4,
		name: "Violet Backpack",
		price: 59.99,
		rating: 3,
		category: "Bags",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 5,
		name: "Plum Hoodie",
		price: 49.99,
		rating: 5,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 6,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 7,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 8,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 9,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 10,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

const categories = ["All", "Shoes", "Clothing", "Accessories", "Bags"];

export default function ProductListing() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "All" || product.category === selectedCategory)
	);

	return (
		<div className="min-h-screen bg-purple-50 dark:bg-purple-900">
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-8 text-3xl font-bold text-purple-800 dark:text-purple-100">
					Our Products
				</h1>

				{/* Filters */}
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
					<div className="relative flex-grow">
						<Input
							type="text"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 dark:bg-purple-800 dark:text-purple-100"
						/>
						<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
					</div>
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger className="w-full sm:w-[180px] dark:bg-purple-800 dark:text-purple-100">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent className="dark:bg-purple-800">
							{categories.map((category) => (
								<SelectItem
									key={category}
									value={category}
									className="dark:text-purple-100"
								>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Product Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				{filteredProducts.length === 0 && (
					<p className="mt-8 text-center text-lg text-purple-800 dark:text-purple-100">
						No products found. Try adjusting your filters.
					</p>
				)}
			</div>
		</div>
	);
}
