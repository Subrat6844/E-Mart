import { dbConnect } from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Parse filter criteria from the request body
    const body = await req.json();
    const {
      category,
      minPrice,
      maxPrice,
      minRating,
      status,
    }: {
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      minRating?: number;
      status?: "active" | "inactive";
    } = body;

    // Build a dynamic query object with proper typing
    const query: Record<string, any> = {};

    // Apply category filter
    if (category) {
      query.category = category;
    }

    // Apply price range filter
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    // Apply minimum average rating filter
    if (minRating !== undefined) {
      query.avgRating = { $gte: minRating };
    }

    // Filter by status (e.g., active products)
    if (status) {
      query.status = status;
    }

    // Execute the query and fetch filtered products
    const products = await ProductModel.find(query)
      .select("name price category avgRating reviewCount images status")
      .lean(); // Use .lean() for faster performance when reading data only

    // Return the filtered products
    return NextResponse.json(
      {
        message: "Filtered products fetched successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in filter API:", error);

    return NextResponse.json(
      { message: "Error fetching filtered products", error: (error as Error).message },
      { status: 500 }
    );
  }
}
