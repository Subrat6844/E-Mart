import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
	try {
		await dbConnect();
		const products = await ProductModel.find();
		return NextResponse.json(
			{ message: "Products Fetched Successfully", products },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching products", error);
		return NextResponse.json(
			{
				message: "Error fetching products",
			},
			{ status: 500 }
		);
	}
}
export async function POST(req: Request) {
	try {
		await dbConnect();
		const { name, description, sku, category, price, images, status } =
			await req.json();
		const session = await getServerSession();
		const isAdmin = session?.user.role === "admin";
		if (!session || !isAdmin) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const isCategoryExists = await ProductModel.findOne({ name: category });
		if (!isCategoryExists) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}
		const product = await ProductModel.create({
			name,
			description,
			sku,
			category: isCategoryExists._id,
			price,
			images,
			status,
		});
		return NextResponse.json(
			{ message: "Product added successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error adding product", error);
		return NextResponse.json(
			{ message: "Error adding product" },
			{ status: 500 }
		);
	}
}
