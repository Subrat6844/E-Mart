import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const product = await ProductModel.findById(params.id);
		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Product fetched successfully", product },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching product", error);
		return NextResponse.json(
			{ message: "Error fetching product" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const product = await ProductModel.findByIdAndDelete(params.id);
		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Product deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting product", error);
		return NextResponse.json(
			{ message: "Error deleting product" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const { name, description, sku, category, price, status } =
			await req.json();
		const product = await ProductModel.findByIdAndUpdate(
			params.id,
			{ name, description, sku, category, price, status },
			{ new: true }
		);
		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Product updated successfully", product },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating product", error);
		return NextResponse.json(
			{ message: "Error updating product" },
			{ status: 500 }
		);
	}
}
