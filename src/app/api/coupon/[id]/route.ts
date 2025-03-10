import { dbConnect } from "@/lib/dbConnect";
import CouponModel from "@/models/Coupon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET a specific coupon by ID (admin only)
export async function GET(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		
		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const coupon = await CouponModel.findById(params.id);
		if (!coupon) {
			return NextResponse.json(
				{ message: "Coupon not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Coupon fetched successfully", coupon },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching coupon", error);
		return NextResponse.json(
			{ message: "Error fetching coupon" },
			{ status: 500 }
		);
	}
}

// Update a coupon (admin only)
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		
		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const {
			code,
			discountType,
			discountValue,
			minimumPurchase,
			maxDiscount,
			validFrom,
			validUntil,
			usageLimit,
			isActive
		} = await req.json();

		// Find the coupon
		const coupon = await CouponModel.findById(params.id);
		if (!coupon) {
			return NextResponse.json(
				{ message: "Coupon not found" },
				{ status: 404 }
			);
		}

		// Check if code is being changed and if it already exists
		if (code && code !== coupon.code) {
			const existingCoupon = await CouponModel.findOne({ 
				code: code.toUpperCase(),
				_id: { $ne: params.id }
			});
			if (existingCoupon) {
				return NextResponse.json(
					{ message: "Coupon code already exists" },
					{ status: 400 }
				);
			}
		}

		// Update the coupon
		const updatedCoupon = await CouponModel.findByIdAndUpdate(
			params.id,
			{
				...(code && { code }),
				...(discountType && { discountType }),
				...(discountValue !== undefined && { discountValue }),
				...(minimumPurchase !== undefined && { minimumPurchase }),
				...(maxDiscount !== undefined && { maxDiscount }),
				...(validFrom && { validFrom: new Date(validFrom) }),
				...(validUntil && { validUntil: new Date(validUntil) }),
				...(usageLimit !== undefined && { usageLimit }),
				...(isActive !== undefined && { isActive })
			},
			{ new: true, runValidators: true }
		);

		return NextResponse.json(
			{ message: "Coupon updated successfully", coupon: updatedCoupon },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating coupon", error);
		return NextResponse.json(
			{ message: "Error updating coupon", error: (error as Error).message },
			{ status: 500 }
		);
	}
}

// Delete a coupon (admin only)
export async function DELETE(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		
		// Get session (check user authentication)
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const coupon = await CouponModel.findByIdAndDelete(params.id);
		if (!coupon) {
			return NextResponse.json(
				{ message: "Coupon not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Coupon deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting coupon", error);
		return NextResponse.json(
			{ message: "Error deleting coupon" },
			{ status: 500 }
		);
	}
}