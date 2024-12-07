import { dbConnect } from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import CategoryModel from "@/models/Category";
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
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
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();

		const {
			name,
			description,
			sku,
			category,
			price,
			status,
			images,
			variants,
		} = await req.json();
		const session = await getServerSession();

		// Authorization check
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Validate product existence
		const product = await ProductModel.findById(params.id);
		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Validate category if provided
		let updatedCategory = product.category;
		if (category) {
			const isCategoryExists = await CategoryModel.findById(category);
			if (!isCategoryExists) {
				return NextResponse.json(
					{ message: "Category not found" },
					{ status: 404 }
				);
			}
			updatedCategory = category;
		}

		// Handle image updates
		let updatedImages = product.images;
		if (images && images.length > 0) {
			updatedImages = [];
			for (const image of images) {
				try {
					const result = await cloudinary.uploader.upload(image, {
						folder: "products",
					});
					updatedImages.push(result.secure_url);
				} catch (error) {
					console.error("Cloudinary upload error:", error);
					return NextResponse.json(
						{ message: "Error uploading images" },
						{ status: 500 }
					);
				}
			}
		}

		// Validate and update variants if provided
		let updatedVariants = product.variants;
		if (
			variants &&
			(!Array.isArray(variants) ||
				variants.some(
					(variant) =>
						typeof variant.size !== "string" ||
						typeof variant.stock !== "number"
				))
		) {
			return NextResponse.json(
				{
					message:
						"Invalid variants format, expected an array of objects with 'size' as string and 'stock' as number",
				},
				{ status: 400 }
			);
		} else if (variants) {
			updatedVariants = variants;
		}

		// Update the product
		const updatedProduct = await ProductModel.findByIdAndUpdate(
			params.id,
			{
				name: name || product.name,
				description: description || product.description,
				sku: sku || product.sku,
				category: updatedCategory,
				price: price !== undefined ? price : product.price,
				status: status || product.status,
				images: updatedImages,
				variants: updatedVariants,
			},
			{ new: true }
		);

		return NextResponse.json(
			{ message: "Product updated successfully", product: updatedProduct },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error updating product", error);
		return NextResponse.json(
			{ message: error.message || "Error updating product" },
			{ status: 500 }
		);
	}
}
