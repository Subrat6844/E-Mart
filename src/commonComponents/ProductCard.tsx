import { Button } from "@/components/ui/button";
import React from "react";

export default function ProductCard({ product }: any) {
	return (
		<div >
			<div
				key={product.id}
				className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
			>
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-64 object-cover"
				/>
				<div className="p-4">
					<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
						{product.name}
					</h3>
					<p className="text-purple-600 dark:text-purple-400 font-bold">
						${product.price.toFixed(2)}
					</p>
					<Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600">
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
