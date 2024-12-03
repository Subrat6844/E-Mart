"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";
export interface CartItem {
	product: string; // Product ID
	name: string; // Product Name
	image: string; // Product Image
	price: number; // Product Price
	quantity: number;
	size?: string; // Optional size
}

export interface Cart {
	user: string; // User ID
	items: CartItem[];
	createdAt: Date;
	updatedAt: Date;
}

interface CartContextValue {
	cart: Cart;
	dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Reducer Actions
type CartAction =
	| { type: "SET_CART"; payload: Cart }
	| { type: "ADD_TO_CART"; payload: CartItem }
	| { type: "REMOVE_FROM_CART"; payload: { product: string; size?: string } }
	| {
			type: "UPDATE_QUANTITY";
			payload: { product: string; quantity: number; size?: string };
	  }
	| { type: "CLEAR_CART" };

// Reducer Function
function cartReducer(state: Cart, action: CartAction): Cart {
	switch (action.type) {
		case "SET_CART":
			return { ...action.payload };

		case "ADD_TO_CART": {
			const existingItemIndex = state.items.findIndex(
				(item) =>
					item.product === action.payload.product &&
					item.size === action.payload.size
			);

			if (existingItemIndex >= 0) {
				const updatedItems = [...state.items];
				updatedItems[existingItemIndex].quantity += action.payload.quantity;
				return { ...state, items: updatedItems };
			}

			return { ...state, items: [...state.items, action.payload] };
		}

		case "REMOVE_FROM_CART": {
			const updatedItems = state.items.filter(
				(item) =>
					item.product !== action.payload.product ||
					item.size !== action.payload.size
			);
			return { ...state, items: updatedItems };
		}

		case "UPDATE_QUANTITY": {
			const updatedItems = state.items.map((item) =>
				item.product === action.payload.product &&
				item.size === action.payload.size
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return { ...state, items: updatedItems };
		}

		case "CLEAR_CART":
			return { ...state, items: [] };

		default:
			return state;
	}
}

// CartProvider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const initialCartState: Cart = {
		user: "1234567890abcdef12345678",
		items: [
			{
				product: "648a1c2b5f1b3a4d6e8c3f9d",
				name: "Wireless Bluetooth Headphones",
				image:
					"https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				price: 49.99,
				quantity: 2,
				size: "M",
			},
			{
				product: "648b1c2b5f1b3a4d6e8c3f9e",
				name: "Smartphone Stand",
				image:
					"https://images.unsplash.com/photo-1532550943366-2b5e0759c233?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				price: 19.99,
				quantity: 1,
			},
			{
				product: "648c1c2b5f1b3a4d6e8c3f9f",
				name: "Laptop Backpack",
				image:
					"https://images.unsplash.com/photo-1536584754829-12214d404f32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				price: 79.99,
				quantity: 3,
				size: "L",
			},
		],
		createdAt: new Date("2024-12-01T12:00:00Z"),
		updatedAt: new Date("2024-12-02T15:30:00Z"),
	};
	const [cart, dispatch] = useReducer(cartReducer, initialCartState);

	return (
		<CartContext.Provider value={{ cart, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
