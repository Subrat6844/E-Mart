"use client";
import { useState, useMemo } from "react";
import { Star, Search, Filter } from "lucide-react";
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
	},
	{
		id: 2,
		name: "Lavender T-Shirt",
		price: 29.99,
		rating: 5,
		category: "Clothing",
	},
	{
		id: 3,
		name: "Amethyst Watch",
		price: 199.99,
		rating: 4,
		category: "Accessories",
	},
	{ id: 4, name: "Violet Backpack", price: 59.99, rating: 3, category: "Bags" },
	{ id: 5, name: "Plum Hoodie", price: 49.99, rating: 5, category: "Clothing" },
	{
		id: 6,
		name: "Indigo Jeans",
		price: 79.99,
		rating: 4,
		category: "Clothing",
	},
];

const categories = ["All", "Shoes", "Clothing", "Accessories", "Bags"];
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

export default function ProductListing() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [sortBy, setSortBy] = useState("Default");

	const filteredAndSortedProducts = useMemo(() => {
		let result = products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(selectedCategory === "All" || product.category === selectedCategory)
		);

		if (sortBy === "Price: Low to High") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "Price: High to Low") {
			result.sort((a, b) => b.price - a.price);
		}

		return result;
	}, [searchTerm, selectedCategory, sortBy]);

	return (
		<div className="min-h-screen bg-purple-50 dark:bg-purple-900">
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-8 text-3xl font-bold text-purple-800 dark:text-purple-100">
					Our Products
				</h1>

				{/* Filters and Sort */}
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
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-full sm:w-[180px] dark:bg-purple-800 dark:text-purple-100">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent className="dark:bg-purple-800">
							{sortOptions.map((option) => (
								<SelectItem
									key={option}
									value={option}
									className="dark:text-purple-100"
								>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Product Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredAndSortedProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				{filteredAndSortedProducts.length === 0 && (
					<p className="mt-8 text-center text-lg text-purple-800 dark:text-purple-100">
						No products found. Try adjusting your filters.
					</p>
				)}
			</div>
		</div>
	);
}
