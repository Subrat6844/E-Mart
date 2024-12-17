import { dbConnect } from "@/lib/dbConnect";
import ReviewModel from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: { productId: string; userId: string } }
) {
	try {
		await dbConnect();

		// Find reviews by productId and userId
		const reviews = await ReviewModel.find({
			product: params.productId,
			user: params.userId,
		}).populate("user", "username email");

		// Check if no reviews found
		if (!reviews || reviews.length === 0) {
			return NextResponse.json(
				{ message: "No reviews found for this product by the specified user" },
				{ status: 404 }
			);
		}

		// Return the fetched reviews
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
