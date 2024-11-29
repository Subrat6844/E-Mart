import { dbConnect } from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// Connect to the database
		await dbConnect();
		// Parse the request body to get the search keyword
		const { keyword }: { keyword?: string } = await req.json();

		// Validate the keyword
		if (!keyword || keyword.trim() === "") {
			return NextResponse.json(
				{ message: "Search keyword is required" },
				{ status: 400 }
			);
		}

		// Perform a case-insensitive search on the name and description fields
		const searchResults = await ProductModel.find({
			$or: [
				{ name: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		}).select("name price images avgRating reviewCount status");
		// Return the search results
		return NextResponse.json(
			{ message: "Search results fetched successfully", searchResults },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error in search API:", error);
		return NextResponse.json(
			{ message: "Error fetching search results" },
			{ status: 500 }
		);
	}
}
