import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CategoryModel from "@/models/Category";
import ProductModel from "@/models/Product";

export async function GET(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const category = await CategoryModel.findById(params.id);
		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Category fetched successfully", category },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error fetching category", error);
		return NextResponse.json(
			{ message: "Error fetching category" },
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
		const body = await req.json();
		const category = await CategoryModel.findByIdAndUpdate(params.id, body, {
			new: true,
		});
		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Category updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error updating category", error);
		return NextResponse.json(
			{ message: "Error updating category" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const category = await CategoryModel.findById(params.id);
		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}
		await ProductModel.updateMany({ category: params.id }, { category: null });

		// Delete the category
		await category.deleteOne();

		return NextResponse.json(
			{ message: "Category deleted successfully and products updated" },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error deleting category", error);
		return NextResponse.json(
			{ message: "Error deleting category" },
			{ status: 500 }
		);
	}
}
