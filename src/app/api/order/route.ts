import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		// Connect to the database
		await dbConnect();
		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Fetch orders for the authenticated user
		const orders = await OrderModel.find({ user: session.user._id })
			.populate("user")
			.populate("address");

		// Send the orders response
		return NextResponse.json(
			{ message: "Orders fetched successfully", orders },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching orders", error);
		return NextResponse.json(
			{ message: "Error fetching orders" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		// Connect to the database
		await dbConnect();

		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Parse request body
		const {
			items,
			address,
			paymentProvider,
			paymentTransactionId,
		}: {
			items: { product: string; quantity: number }[];
			address: string;
			paymentProvider: string;
			paymentTransactionId: string;
		} = await req.json();

		// Validate cart items
		if (!items || items.length === 0) {
			return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
		}

		// Initialize total price
		let total = 0;
		const orderItems = [];

		// Loop through the items to create order items and calculate total price
		for (const item of items) {
			const product = await ProductModel.findById(item.product);
			if (!product) {
				return NextResponse.json(
					{ message: `Product ${item.product} not found` },
					{ status: 404 }
				);
			}

			const price = product.price;
			const totalItemPrice = price * item.quantity;
			total += totalItemPrice;

			// Create an order item and add it to the order items array
			orderItems.push({
				product: item.product,
				quantity: item.quantity,
				price,
				total: totalItemPrice,
			});
		}
		// Create the order with the created items and other details
		const order = await OrderModel.create({
			user: session.user._id,
			status: "pending",
			paymentStatus: "unpaid",
			paymentProvider,
			paymentTransactionId,
			total,
			address,
			items: orderItems,
		});
		await CartModel.updateOne(
			{ user: session.user._id },
			{ $pull: { items: { product: { $in: items.map((i) => i.product) } } } }
		);
		// Return the created order
		return NextResponse.json(
			{ message: "Order created successfully", order },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json(
			{ message: "Error creating order" },
			{ status: 500 }
		);
	}
}
