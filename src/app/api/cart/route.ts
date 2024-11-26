import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		await dbConnect();
		const { productId, quantity } = await req.json();

		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user._id;
		if (!productId || !quantity) {
			return NextResponse.json({ message: "Missing fields" }, { status: 400 });
		}

		const cart = await CartModel.findOne({ user: userId });

		if (cart) {
			// Check if the product already exists in the cart
			const itemIndex = cart.items.findIndex(
				(item) => item.product.toString() === productId
			);

			if (itemIndex > -1) {
				// Update quantity if product exists
				cart.items[itemIndex].quantity += quantity;
			} else {
				// Add new product to cart
				cart.items.push({ product: productId, quantity });
			}

			await cart.save();
		} else {
			// Create a new cart for the user
			await CartModel.create({
				user: userId,
				items: [{ product: productId, quantity }],
			});
		}

		return NextResponse.json(
			{ message: "Cart updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating cart", error);
		return NextResponse.json(
			{ message: "Error updating cart" },
			{ status: 500 }
		);
	}
}
