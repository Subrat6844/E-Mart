"use client";
import { Product, useProduct } from "@/context/ProductContext";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import Loading from "./loading";
import ProductNotFound from "./ProductNotFound";

export default function page({ params }: { params: { id: string } }) {
	const { products } = useProduct();
	const [pageProduct, setPageProduct] = useState<Product | null | "loading">(
		"loading"
	);
	const { id } = params;

	useEffect(() => {
		const product = products.find((p) => p._id === id) as Product;
		if (product) {
			setPageProduct(product);
		} else {
			setPageProduct(null);
		}
	}, [id, products]);

	if (pageProduct === "loading") {
		return <Loading />;
	}

	if (!pageProduct) {
		return <ProductNotFound />;
	}

	return <ProductDetails product={pageProduct as Product} />;
}
