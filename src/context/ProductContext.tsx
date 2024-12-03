"use client";
import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

export interface Product {
	_id: string;
	name: string;
	description: string;
	sku: string;
	category: {
		name: string;
	};
	price: number;
	images: string[];
	status: "active" | "inactive";
	avgRating: number;
	reviewCount: number;
	variants: { size: string; stock: number }[];
}

interface ProductContextType {
	products: Product[];
	fetchProducts: () => Promise<void>;
	fetchProductById: (id: string) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([
		{
		  _id: "prod1",
		  name: "Classic T-Shirt",
		  description: "A comfortable and stylish t-shirt for daily wear.",
		  sku: "TSH123",
		  category: { name: "Clothing" },
		  price: 19.99,
		  images: [
			"https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			
		  ],
		  status: "active",
		  avgRating: 4.5,
		  reviewCount: 120,
		  variants: [
			{ size: "S", stock: 15 },
			{ size: "M", stock: 10 },
			{ size: "L", stock: 5 },
		  ],
		},
		{
		  _id: "prod2",
		  name: "Denim Jeans",
		  description: "Durable and trendy denim jeans for all occasions.",
		  sku: "DEN456",
		  category: { name: "Denim" },
		  price: 49.99,
		  images: [
			"https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			
		  ],
		  status: "active",
		  avgRating: 4.8,
		  reviewCount: 95,
		  variants: [
			{ size: "32", stock: 8 },
			{ size: "34", stock: 4 },
			{ size: "36", stock: 7 },
		  ],
		},
		{
		  _id: "prod3",
		  name: "Running Shoes",
		  description: "Lightweight and comfortable shoes for running.",
		  sku: "SHOE789",
		  category: { name: "Shoes" },
		  price: 79.99,
		  images: [
			"https://images.unsplash.com/photo-1557461761-c7c2b7a5fa97?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		  ],
		  status: "active",
		  avgRating: 2.7,
		  reviewCount: 250,
		  variants: [
			{ size: "8", stock: 10 },
			{ size: "9", stock: 6 },
			{ size: "10", stock: 12 },
		  ],
		},]);
	// Fetch all products
	const fetchProducts = async () => {
		try {
			const response = await fetch("/api/products");
			if (!response.ok) throw new Error("Failed to fetch products");
			const data = await response.json();
			setProducts(data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	// Fetch a single product by ID
	const fetchProductById = async (id: string): Promise<Product | null> => {
		try {
			const response = await fetch(`/api/products/${id}`);
			if (!response.ok) throw new Error("Failed to fetch product");
			const data = await response.json();
			return data.product;
		} catch (error) {
			console.error("Error fetching product:", error);
			return null;
		}
	};
	useEffect(() => {
		fetchProducts(); // Fetch products on component mount
	}, []);

	return (
		<ProductContext.Provider
			value={{ products, fetchProducts, fetchProductById }}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProduct must be used within a ProductProvider");
	}
	return context;
};
