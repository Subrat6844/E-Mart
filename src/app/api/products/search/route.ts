import { dbConnect } from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		await dbConnect();
		const { keyword }: { keyword?: string } = await req.json();
		if (!keyword || keyword.trim() === "") {
			return NextResponse.json(
				{ message: "Search keyword is required" },
				{ status: 400 }
			);
		}

		const searchResults = await ProductModel.find({
			$or: [
				{ name: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		}).select("name price images avgRating reviewCount status");
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
