import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import OrderModel from "@/models/Order";
import { getServerSession } from "next-auth";
export async function GET(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		// Connect to the database
		await dbConnect();

		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Fetch the order by ID for the authenticated user
		const order = await OrderModel.findOne({
			_id: params.id,
			user: session.user._id,
		})
			.populate("user")
			.populate("address")
			.populate("items");

		if (!order) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}

		// Send the order response
		return NextResponse.json(
			{ message: "Order fetched successfully", order },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching order by ID", error);
		return NextResponse.json(
			{ message: "Error fetching order" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		// Connect to the database
		await dbConnect();

		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Parse the request body
		const {
			status,
			paymentStatus,
		}: { status?: string; paymentStatus?: string } = await req.json();

		// Validate the order status if provided
		const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];
		if (status && !allowedStatuses.includes(status)) {
			return NextResponse.json(
				{ message: "Invalid order status" },
				{ status: 400 }
			);
		}

		// Find the order by ID
		const order = await OrderModel.findOne({
			_id: params.id,
		});

		if (!order) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}
		if (order.status === "delivered" || order.status === "cancelled") {
			return NextResponse.json(
				{
					message: `Order cannot be cancelled as it has already been ${order.status}`,
				},
				{ status: 400 }
			);
		}
		// Update the order status or payment status
		if (status) order.status = status;
		if (paymentStatus) order.paymentStatus = paymentStatus;

		await order.save(); // Save the updated order

		// Send the updated order response
		return NextResponse.json(
			{ message: "Order updated successfully", order },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating order:", error);
		return NextResponse.json(
			{ message: "Error updating order" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		// Connect to the database
		await dbConnect();

		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Find the order by ID
		const order = await OrderModel.findOneAndDelete({
			_id: params.id,
			user: session.user._id,
		});

		if (!order) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}

		// Send the response that the order was deleted
		return NextResponse.json(
			{ message: "Order deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting order:", error);
		return NextResponse.json(
			{ message: "Error deleting order" },
			{ status: 500 }
		);
	}
}
