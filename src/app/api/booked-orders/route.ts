import { dbConnect } from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		// Connect to the database
		await dbConnect();
		const session = await getServerSession();
		const isAdmin = session?.user.role === "admin";
		if (!session || !isAdmin) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Fetch orders for the authenticated user
		const orders = await OrderModel.find()
			.populate("user", "name email") // Populate user details (name and email)
			.populate({
				path: "items.product", // Populate the product in items
				select: "name price images", // Choose which fields to include from the product
			})
			.populate("address");
		if (orders.length === 0) {
			return NextResponse.json({ message: "No orders found" }, { status: 404 });
		}
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
