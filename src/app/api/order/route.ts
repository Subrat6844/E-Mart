import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import OrderModel, { OrderItem } from "@/models/Order";
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const order = await OrderModel.find({ user: session.user._id })
			.populate("user")
			.populate("items")
			.populate("address")
			.populate("paymentMethod");

		return NextResponse.json(
			{ message: "Order fetched successfully", order },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching order", error);
		return NextResponse.json(
			{ message: "Error fetching order" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const {
			items,
			address,
			paymentMethod,
		}: {
			items: { product: string; quantity: number }[];
			address: string;
			paymentMethod: string;
		} = await req.json();

		// Validate cart items
		if (!items || items.length === 0) {
			return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
		}

		// Create Order Items
		const orderItems = [];
		let total = 0;

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

			const orderItem = await OrderItem.create({
				user: session.user._id,
				product: item.product,
				quantity: item.quantity,
				price,
				total: totalItemPrice,
			});

			orderItems.push(orderItem._id);
		}

		// Create Order
		const order = await OrderModel.create({
			user: session.user._id,
			status: "pending",
			paymentStatus: "unpaid",
			total,
			address,
			paymentMethod,
			items: orderItems,
		});
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
