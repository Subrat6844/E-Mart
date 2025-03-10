import { dbConnect } from "@/lib/dbConnect";
import CouponModel from "@/models/Coupon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const coupons = await CouponModel.find();
		return NextResponse.json({ message: "Coupons fetched successfully", coupons }, { status: 200 });
	} catch (error) {
		console.error("Error fetching coupons:", error);
		return NextResponse.json({ message: "Error fetching coupons" }, { status: 500 });
	}
}


export async function POST(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const couponData = await req.json();
		const newCoupon = await CouponModel.create(couponData);
		return NextResponse.json({ message: "Coupon created successfully", coupon: newCoupon }, { status: 201 });
	} catch (error) {
		console.error("Error creating coupon:", error);
		return NextResponse.json({ message: "Error creating coupon" }, { status: 500 });
	}
}

export async function PATCH(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { id, ...updateData } = await req.json();
		const updatedCoupon = await CouponModel.findByIdAndUpdate(id, updateData, { new: true });

		if (!updatedCoupon) {
			return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Coupon updated successfully", coupon: updatedCoupon }, { status: 200 });
	} catch (error) {
		console.error("Error updating coupon:", error);
		return NextResponse.json({ message: "Error updating coupon" }, { status: 500 });
	}
}
export async function DELETE(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { id } = await req.json();
		await CouponModel.findByIdAndDelete(id);

		return NextResponse.json({ message: "Coupon deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error deleting coupon:", error);
		return NextResponse.json({ message: "Error deleting coupon" }, { status: 500 });
	}
}
