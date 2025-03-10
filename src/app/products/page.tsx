"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/commonComponents/ProductCard";
import { useProduct } from "@/context/ProductContext";
import { FilterModal } from "@/components/FilterModel";
import ProductCardSkeleton from "@/commonComponents/ProductCardSkeleton";

const categories = ["All", "Shoes", "Clothing", "Accessories", "Bags"];
const sortOptions = ["Price: Low to High", "Price: High to Low"];

export default function ProductListing() {
	const { products, loading, error, searchProducts, filterProducts } =
		useProduct();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [sortBy, setSortBy] = useState("Price: Low to High");
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
	const [minRating, setMinRating] = useState(0);

	const router = useRouter();
	const searchParams = useSearchParams();

	const updateSearchParams = useCallback(
		(updates: Record<string, string>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());
			Object.entries(updates).forEach(([key, value]) => {
				if (value === "All" || !value) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, value);
				}
			});
			router.push(`?${newSearchParams.toString()}`, { scroll: false });
		},
		[router, searchParams]
	);

	useEffect(() => {
		setSearchTerm(searchParams.get("search") || "");
		setSelectedCategory(searchParams.get("category") || "All");
		setSortBy(searchParams.get("sort") || "Price: Low to High");
		setPriceRange({
			min: Number(searchParams.get("minPrice")) || 0,
			max: Number(searchParams.get("maxPrice")) || 1000,
		});
		setMinRating(Number(searchParams.get("minRating")) || 0);
	}, [searchParams]);

	useEffect(() => {
		const debouncedSearch = setTimeout(() => {
			if (searchTerm) {
				searchProducts(searchTerm);
			}
		}, 300);

		return () => clearTimeout(debouncedSearch);
	}, [searchTerm, searchProducts]);

	const handleFilter = useCallback(() => {
		const filters = {
			category: selectedCategory !== "All" ? selectedCategory : undefined,
			minPrice: priceRange.min,
			maxPrice: priceRange.max,
			minRating,
			status: "active" as const,
		};
		filterProducts(filters);
		updateSearchParams({
			category: selectedCategory,
			minPrice: priceRange.min.toString(),
			maxPrice: priceRange.max.toString(),
			minRating: minRating.toString(),
		});
		setIsFilterModalOpen(false);
	}, [
		selectedCategory,
		priceRange,
		minRating,
		filterProducts,
		updateSearchParams,
	]);

	const sortedProducts = [...products].sort((a, b) => {
		if (sortBy === "Price: Low to High") return a.price - b.price;
		if (sortBy === "Price: High to Low") return b.price - a.price;
		return 0;
	});

	const getSortIcon = (option: string) => {
		switch (option) {
			case "Price: Low to High":
				return <ArrowUp className="h-4 w-4 ml-2" />;
			case "Price: High to Low":
				return <ArrowDown className="h-4 w-4 ml-2" />;
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-100">
					Our Products
				</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
						<p className="font-bold">Error</p>
						<p>{error}</p>
					</div>
				)}

				{/* Search and Filters */}
				<div className="mb-8 flex flex-wrap items-center gap-4">
					<div className="relative flex-grow">
						<Input
							type="text"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								updateSearchParams({ search: e.target.value });
							}}
							className="pl-10 pr-4 py-2 w-full dark:bg-gray-800 dark:text-gray-100 rounded-md"
						/>
						<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
					</div>
					<Button
						onClick={() => setIsFilterModalOpen(true)}
						variant="outline"
						className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					>
						<Filter className="h-5 w-5" />
						Filter
					</Button>
					<Select
						value={sortBy}
						onValueChange={(value) => {
							setSortBy(value);
							updateSearchParams({ sort: value });
						}}
					>
						<SelectTrigger className="w-[200px] dark:bg-gray-800 dark:text-gray-100">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent className="dark:bg-gray-800">
							{sortOptions.map((option) => (
								<SelectItem
									key={option}
									value={option}
									className="dark:text-gray-100 flex items-center justify-between"
								>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Product Grid */}
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
            ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : sortedProducts.map((product) => <ProductCard key={product._id} product={product} />)}
				</div>

				{!loading && sortedProducts.length === 0 && (
					<div className="mt-8 text-center bg-white dark:bg-gray-800 rounded-lg p-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
							No products found
						</h3>
						<p className="mt-1 text-gray-500 dark:text-gray-400">
							Try adjusting your filters or search terms
						</p>
					</div>
				)}

				<FilterModal
					isOpen={isFilterModalOpen}
					onClose={() => setIsFilterModalOpen(false)}
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					priceRange={priceRange}
					onPriceRangeChange={setPriceRange}
					minRating={minRating}
					onMinRatingChange={setMinRating}
					onApplyFilters={handleFilter}
				/>
			</div>
		</div>
	);
}
