import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		await dbConnect();
		const { productId, quantity, size } = await req.json();

		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user._id;

		if (!productId || !quantity) {
			return NextResponse.json({ message: "Missing fields" }, { status: 400 });
		}

		// Fetch the product to get additional details (e.g., name, image, and price)
		const product = await ProductModel.findById(productId).select(
			"name images price"
		);

		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		const productName = product.name;
		const productImage = product.images?.[0] || ""; // Use the first image or an empty string
		const productPrice = product.price;

		// Check if the user already has a cart
		let cart = await CartModel.findOne({ user: userId });

		if (cart) {
			// Check if the product with the same size already exists in the cart
			const itemIndex = cart.items.findIndex(
				(item) => item.product.toString() === productId && item.size === size
			);

			if (itemIndex > -1) {
				// Update quantity if the product exists
				cart.items[itemIndex].quantity += quantity;
			} else {
				// Add new product to the cart
				cart.items.push({
					product: productId,
					name: productName,
					image: productImage,
					price: productPrice,
					quantity,
					size,
				});
			}

			await cart.save();
		} else {
			// Create a new cart for the user
			cart = await CartModel.create({
				user: userId,
				items: [
					{
						product: productId,
						name: productName,
						image: productImage,
						price: productPrice,
						quantity,
						size,
					},
				],
			});
		}

		return NextResponse.json(
			{ message: "Cart updated successfully", cart },
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
