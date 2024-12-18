"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, PackageOpen } from "lucide-react";
import Link from "next/link";
import { Product } from "@/context/ProductContext";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoader() {
	return (
		<div className="p-4 space-y-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className="flex items-center justify-between gap-4 p-2 border-b animate-pulse"
				>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					<Skeleton className="h-4 w-24 rounded"></Skeleton>
					
					
				</div>
			))}
		</div>
	);
}


export default function ProductsListPage() {
	const [products, setProducts] = useState([] as Product[]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		try {
			const response = await fetch("/api/product");
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			setProducts(data.products as Product[]);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	async function deleteProduct(productId: string): Promise<void> {
		try {
			const response = await fetch(`/api/product/${productId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to delete product");
			}

			const data = await response.json();
			console.log("Product deleted successfully:", data.message);
			setProducts(products.filter((product) => product._id !== productId));
		} catch (error: any) {
			console.error("Error deleting product:", error.message);
			alert(`Error: ${error.message}`);
		}
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="space-y-4 p-8 pt-6">
			<div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
				<h2 className="text-3xl font-bold tracking-tight">Products</h2>
				<Link href="/dashboard/products/add">
					<Button>Add New Product</Button>
				</Link>
			</div>
			<div className="rounded-md border">
				{loading ? (
					<SkeletonLoader />
				) : products.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Name</TableHead>
								<TableHead>SKU</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Avg. Rating</TableHead>
								<TableHead>Reviews</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product._id}>
									<TableCell className="font-medium">{product.name}</TableCell>
									<TableCell>{product.sku}</TableCell>
									<TableCell>{product.category.name}</TableCell>
									<TableCell>${product.price.toFixed(2)}</TableCell>
									<TableCell>{product.status}</TableCell>
									<TableCell>{product.avgRating.toFixed(1)}</TableCell>
									<TableCell>{product.reviewCount}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>
													<Link
														href={`/dashboard/products/edit/${product._id}`}
														className="flex items-center"
													>
														<Pencil className="mr-2 h-4 w-4" />
														<span>Edit</span>
													</Link>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() => deleteProduct(product._id)}
												>
													<Trash className="mr-2 h-4 w-4" />
													<span>Delete</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className="flex flex-col items-center justify-center p-10">
						<PackageOpen className="h-12 w-12 text-gray-400 mb-4" />
						<p className="text-gray-500 text-lg">No products found</p>
						<p className="text-gray-400">Get started by adding a new product!</p>
						<Link href="/dashboard/products/add">
							<Button variant="outline" className="mt-4">
								Add New Product
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
