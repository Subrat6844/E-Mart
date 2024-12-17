"use client";
import { Product, useProduct } from "@/context/ProductContext";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import Loading from "./loading";
import ProductNotFound from "./ProductNotFound";

export default function Page({ params }: { params: { id: string } }) {
  const { products, fetchProductById } = useProduct();
  const [pageProduct, setPageProduct] = useState<Product | null | "loading">(
    "loading"
  );
  const { id } = params;

  useEffect(() => {
    const loadProduct = async () => {
      const existingProduct = products.find((p) => p._id === id);
      if (existingProduct) {
        setPageProduct(existingProduct);
      } else {
        const fetchedProduct = await fetchProductById(id);
        if (fetchedProduct) {
          setPageProduct(fetchedProduct);
        } else {
          setPageProduct(null); // Product not found
        }
      }
    };

    loadProduct();
  }, [id, products, fetchProductById]);

  if (pageProduct === "loading") {
    return <Loading />;
  }

  if (!pageProduct) {
    return <ProductNotFound />;
  }

  return <ProductDetails product={pageProduct} />;
}
