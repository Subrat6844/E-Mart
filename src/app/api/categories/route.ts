import { dbConnect } from "@/lib/dbConnect";
import CategoryModel from "@/models/Category";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		await dbConnect();
		const categories = await CategoryModel.find()
			.populate("parentCategory")
			.exec();
		if (!categories) {
			return NextResponse.json(
				{ message: "No Category Found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Categories Fetched Successfully", categories },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching categories", error);
		return NextResponse.json(
			{ message: "Error fetching categories" },
			{ status: 500 }
		);
	}
}
interface CategoryRequest {
	name: string;
	parentCategory?: string; // Optional for subcategories
	description?: string; // Optional description
}

export async function POST(req: Request) {
	try {
		await dbConnect();

		// Parse request body
		const { name, parentCategory, description }: CategoryRequest =
			await req.json();

		// Check for valid session and admin rights
		const session: Session | null = await getServerSession();
		const isAdmin = session?.user.role === "admin";
		if (!session || !isAdmin) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Check if category name already exists
		const existingCategory = await CategoryModel.findOne({ name });
		if (existingCategory) {
			return NextResponse.json(
				{ message: "Category name already exists" },
				{ status: 409 }
			);
		}

		// If parentCategory is provided, ensure it exists
		if (parentCategory) {
			const parentExists = await CategoryModel.findById(parentCategory);
			if (!parentExists) {
				return NextResponse.json(
					{ message: "Parent category not found" },
					{ status: 404 }
				);
			}
		}

		// Create the category
		const category = await CategoryModel.create({
			name,
			parentCategory: parentCategory || null,
			description,
		});

		return NextResponse.json(
			{ message: "Category added successfully", category },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error adding category:", error);
		return NextResponse.json(
			{ message: "Error adding category", error: (error as Error).message },
			{ status: 500 }
		);
	}
}
