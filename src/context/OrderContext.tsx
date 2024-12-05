"use client";
import { createContext, useReducer, useContext, ReactNode } from "react";

// Order and Address Types
export interface OrderItem {
	product: {
		_id: string;
		name: string;
		price: number;
		images: string[];
	};
	quantity: number;
	size?: string;
	price: number;
	total: number;
}

export interface Address {
	_id: string;
	user: string;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	type: "billing" | "shipping";
	createdAt: string;
}

export interface Order {
	_id: string;
	user: string;
	status: "pending" | "shipped" | "delivered" | "cancelled";
	paymentStatus: "paid" | "unpaid";
	paymentProvider: string;
	paymentTransactionId: string;
	total: number;
	address: Address;
	items: OrderItem[];
	createdAt: string;
	updatedAt: string;
}

// Order Context State and Actions
interface OrderState {
	orders: Order[];
}

type OrderAction =
	| { type: "SET_ORDERS"; payload: Order[] }
	| { type: "ADD_ORDER"; payload: Order }
	| { type: "UPDATE_ORDER"; payload: Order }
	| { type: "REMOVE_ORDER"; payload: string };

const OrderContext = createContext<{
	state: OrderState;
	dispatch: React.Dispatch<OrderAction>;
} | null>(null);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
	switch (action.type) {
		case "SET_ORDERS":
			return { ...state, orders: action.payload };
		case "ADD_ORDER":
			return { ...state, orders: [...state.orders, action.payload] };
		case "UPDATE_ORDER":
			return {
				...state,
				orders: state.orders.map((order) =>
					order._id === action.payload._id ? action.payload : order
				),
			};
		case "REMOVE_ORDER":
			return {
				...state,
				orders: state.orders.filter((order) => order._id !== action.payload),
			};
		default:
			throw new Error(`Unhandled action type: ${(action as any).type}`);
	}
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(orderReducer, {
		orders: [
			{
				_id: "12",
				user: "user1",
				status: "shipped",
				paymentStatus: "unpaid",
				paymentProvider: "stripe",
				paymentTransactionId: "tx_123",
				total: 99.99,
				address: {
					_id: "addr1",
					user: "user1",
					addressLine1: "123 Main St",
					city: "Anytown",
					state: "CA",
					country: "USA",
					postalCode: "12345",
					type: "shipping",
					createdAt: "2023-01-01T00:00:00.000Z",
				},
				items: [
					{
						product: {
							_id: "prod1",
							name: "T-Shirt",
							price: 29.99,
							images: ["https://images.unsplash.com/photo-1499713907394-43c9d094ac2e?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
						},
						quantity: 2,
						price: 29.99,
						total: 59.98,
					},
					{
						product: {
							_id: "prod2",
							name: "Jeans",
							price: 39.99,
							images: ["https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
						},
						quantity: 1,
						price: 39.99,
						total: 39.99,
					},
				],
				createdAt: "2023-06-01T10:00:00.000Z",
				updatedAt: "2023-06-01T10:00:00.000Z",
			},
			{
				_id: "13",
				user: "user2",
				status: "pending",
				paymentStatus: "paid",
				paymentProvider: "paypal",
				paymentTransactionId: "tx_456",
				total: 120.5,
				address: {
					_id: "addr2",
					user: "user2",
					addressLine1: "456 Elm St",
					city: "Somewhere",
					state: "NY",
					country: "USA",
					postalCode: "67890",
					type: "shipping",
					createdAt: "2023-02-01T00:00:00.000Z",
				},
				items: [
					{
						product: {
							_id: "prod3",
							name: "Sweater",
							price: 50.5,
							images: ["https://images.pexels.com/photos/1476055/pexels-photo-1476055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
						},
						quantity: 1,
						price: 50.5,
						total: 50.5,
					},
					{
						product: {
							_id: "prod4",
							name: "Shoes",
							price: 70,
							images: ["https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
						},
						quantity: 1,
						price: 70,
						total: 70,
					},
				],
				createdAt: "2023-06-05T11:00:00.000Z",
				updatedAt: "2023-06-06T12:00:00.000Z",
			},
			{
				_id: "14",
				user: "user3",
				status: "delivered",
				paymentStatus: "paid",
				paymentProvider: "stripe",
				paymentTransactionId: "tx_789",
				total: 200.0,
				address: {
					_id: "addr3",
					user: "user3",
					addressLine1: "789 Oak St",
					city: "Hometown",
					state: "TX",
					country: "USA",
					postalCode: "54321",
					type: "billing",
					createdAt: "2023-03-01T00:00:00.000Z",
				},
				items: [
					{
						product: {
							_id: "prod5",
							name: "Jacket",
							price: 150.0,
							images: ["https://images.pexels.com/photos/1476055/pexels-photo-1476055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
						},
						quantity: 1,
						price: 150.0,
						total: 150.0,
					},
					{
						product: {
							_id: "prod6",
							name: "Cap",
							price: 50.0,
							images: ["https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg"],
						},
						quantity: 1,
						price: 50.0,
						total: 50.0,
					},
				],
				createdAt: "2023-06-10T15:00:00.000Z",
				updatedAt: "2023-06-11T16:00:00.000Z",
			},
		],
	});

	return (
		<OrderContext.Provider value={{ state, dispatch }}>
			{children}
		</OrderContext.Provider>
	);
};
export const useOrder = () => {
	const context = useContext(OrderContext);
	if (!context) {
		throw new Error("useOrder must be used within an OrderProvider");
	}
	return context;
};
