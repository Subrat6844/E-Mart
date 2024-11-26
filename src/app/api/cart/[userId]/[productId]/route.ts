import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function DELETE(
	req: Request,
	{ params }: { params: { userId: string; productId: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		if (params.userId !== session.user._id) {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}
		const cart = await CartModel.findOneAndUpdate(
			{ user: params.userId },
			{ $pull: { items: { product: params.productId } } },
			{ new: true }
		);

		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Product removed successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error removing product", error);
		return NextResponse.json(
			{ message: "Error removing product" },
			{ status: 500 }
		);
	}
}
