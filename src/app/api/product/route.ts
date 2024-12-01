import { dbConnect } from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CategoryModel from "@/models/Category";
import { v2 as cloudinary } from "cloudinary";
import { Session } from "next-auth";

export async function GET(req: Request) {
	try {
		await dbConnect();
		const products = await ProductModel.find();
		if (!products) {
			return NextResponse.json(
				{ message: "No Products Found" },
				{ status: 404 }
			);
		}
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

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
	try {
		await dbConnect();

		const { name, description, sku, category, price, images, status, size } =
			await req.json();

		// Get the current user session
		const session: Session | null = await getServerSession();
		const isAdmin = session?.user.role === "admin";

		// Authorization check
		if (!session || !isAdmin) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Validate required fields
		if (!name || !sku || !category || !price || !status) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if the category exists
		const isCategoryExists = await CategoryModel.findOne({ name: category });
		if (!isCategoryExists) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}

		// Validate `status`
		if (!["active", "inactive"].includes(status)) {
			return NextResponse.json(
				{ message: "Invalid status value" },
				{ status: 400 }
			);
		}

		// Validate `size` if provided
		if (
			size &&
			(!Array.isArray(size) || size.some((s) => typeof s !== "string"))
		) {
			return NextResponse.json(
				{ message: "Invalid size format, expected an array of strings" },
				{ status: 400 }
			);
		}

		// Handle image uploads
		const uploadedImages = [];
		if (images && images.length > 0) {
			for (const image of images) {
				try {
					const result = await cloudinary.uploader.upload(image, {
						folder: "products",
					});
					uploadedImages.push(result.secure_url);
				} catch (error) {
					console.error("Cloudinary upload error:", error);
					return NextResponse.json(
						{ message: "Error uploading images" },
						{ status: 500 }
					);
				}
			}
		}

		// Create the product
		const product = await ProductModel.create({
			name,
			description,
			sku,
			category: isCategoryExists._id,
			price,
			images: uploadedImages, // Save the uploaded image URLs
			status,
			size, // Include size field in product creation
		});

		return NextResponse.json(
			{ message: "Product added successfully", product },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error while adding product:", error);
		return NextResponse.json(
			{ message: error.message || "Error adding product" },
			{ status: 500 }
		);
	}
}
