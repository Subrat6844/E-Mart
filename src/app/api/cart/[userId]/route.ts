import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(
	_req: Request,
	{ params }: { params: { userId: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const cart = await CartModel.findOne({ user: params.userId }).populate(
			"items.product"
		);

		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Cart fetched successfully", cart },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching cart", error);
		return NextResponse.json(
			{ message: "Error fetching cart" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { userId: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const cart = await CartModel.findOneAndDelete({ user: params.userId });
		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}
		return NextResponse.json(
			{ message: "Cart deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting cart", error);
		return NextResponse.json(
			{ message: "Error deleting cart" },
			{ status: 500 }
		);
	}
}
