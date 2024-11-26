import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import OrderModel, { OrderItem } from "@/models/Order";
import { getServerSession } from "next-auth";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const order = await OrderModel.findById(params.id)
			.populate("user")
			.populate("items")
			.populate("address")
			.populate("paymentMethod");

		if (!order) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}
		if (
			order.user.toString() !== session.user._id &&
			session.user.role !== "admin"
		) {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}

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

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const session = await getServerSession();
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { status }: { status: "pending" | "shipped" | "delivered" | "cancelled" } = await req.json();

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Order status updated successfully", updatedOrder },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const session = await getServerSession();
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const deletedOrder = await OrderModel.findByIdAndDelete(params.id);

        if (!deletedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Cleanup associated OrderItems
        await OrderItem.deleteMany({ order: deletedOrder._id });
        return NextResponse.json(
            { message: "Order deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ message: "Error deleting order" }, { status: 500 });
    }
}
