import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import ReviewModel from "@/models/Review";
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		await dbConnect();
		const reviews = await ReviewModel.find({
			product: params.productId,
		}).populate("user", "username email");

		if (!reviews || reviews.length === 0) {
			return NextResponse.json(
				{ message: "No reviews found for this product" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Reviews fetched successfully", reviews },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching reviews", error);
		return NextResponse.json(
			{ message: "Error fetching reviews" },
			{ status: 500 }
		);
	}
}

export async function POST(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const { comment, rating } = await req.json();

		const productExists = await ProductModel.findById(params.productId);
		if (!productExists) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		const existingReview = await ReviewModel.findOne({
			user: session.user._id,
			product: params.productId,
		});

		if (existingReview) {
			return NextResponse.json(
				{ message: "User has already reviewed this product" },
				{ status: 400 }
			);
		}

		const review = await ReviewModel.create({
			user: session.user._id,
			product: params.productId,
			rating,
			comment,
		});
		const reviews = await ReviewModel.find({ product: params.productId });
		const avgRating =
			reviews.length > 0
				? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
				: 0;
		productExists.avgRating = avgRating;
		productExists.reviewCount = reviews.length;
		await productExists.save();
		return NextResponse.json(
			{ message: "Review added successfully", review },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error adding reviews", error);
		return NextResponse.json(
			{ message: "Error adding reviews" },
			{ status: 500 }
		);
	}
}
export async function DELETE(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		await dbConnect();

		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const review = await ReviewModel.findOneAndDelete({
			product: params.productId,
			user: session.user._id,
		});

		if (!review) {
			return NextResponse.json(
				{ message: "Review not found" },
				{ status: 404 }
			);
		}
		const reviews = await ReviewModel.find({ product: params.productId });
		const avgRating =
			reviews.length > 0
				? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
				: 0;

		await ProductModel.findByIdAndUpdate(params.productId, {
			avgRating,
			reviewCount: reviews.length,
		});

		return NextResponse.json(
			{ message: "Review deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting review", error);
		return NextResponse.json(
			{ message: "Error deleting review" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		await dbConnect();

		const { rating, comment } = await req.json();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const review = await ReviewModel.findOneAndUpdate(
			{ product: params.productId, user: session.user._id },
			{ rating, comment },
			{ new: true }
		);

		if (!review) {
			return NextResponse.json(
				{ message: "Review not found" },
				{ status: 404 }
			);
		}
		const reviews = await ReviewModel.find({ product: params.productId });
		const avgRating =
			reviews.length > 0
				? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
				: 0;

		await ProductModel.findByIdAndUpdate(params.productId, {
			avgRating,
			reviewCount: reviews.length,
		});

		return NextResponse.json(
			{ message: "Review updated successfully", review },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating review", error);
		return NextResponse.json(
			{ message: "Error updating review" },
			{ status: 500 }
		);
	}
}
