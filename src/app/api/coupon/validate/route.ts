import { dbConnect } from "@/lib/dbConnect";
import CouponModel, { Coupon } from "@/models/Coupon";
import CartModel, { Cart } from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * Validates and applies a coupon to the user's cart.
 */
export async function POST(req: Request) {
	try {
		await dbConnect();

		// 🔹 Get user session
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// 🔹 Parse request body
		const { code }: { code: string } = await req.json();
		if (!code) {
			return NextResponse.json({ message: "Coupon code is required" }, { status: 400 });
		}

		// 🔹 Find the coupon in the database
		const coupon: Coupon | null = await CouponModel.findOne({
			code: code.toUpperCase(),
			isActive: true,
			validFrom: { $lte: new Date() },
			validUntil: { $gte: new Date() },
		});

		if (!coupon) {
			return NextResponse.json({ message: "Invalid or expired coupon code" }, { status: 400 });
		}

		// 🔹 Check if the coupon usage limit has been reached
		if (coupon.usageLimit && coupon.usageCount && coupon.usageCount >= coupon.usageLimit) {
			return NextResponse.json({ message: "Coupon usage limit reached" }, { status: 400 });
		}

		// 🔹 Retrieve user's cart
		const cart: Cart | null = await CartModel.findOne({ user: session.user._id });
		if (!cart || !cart.items || cart.items.length === 0) {
			return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
		}

		// 🔹 Calculate cart total
		let cartTotal = cart.items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

		// 🔹 Ensure minimum purchase requirement is met
		if (coupon.minimumPurchase && cartTotal < coupon.minimumPurchase) {
			return NextResponse.json(
				{
					message: `Minimum purchase of ${coupon.minimumPurchase} required for this coupon`,
					minimumPurchase: coupon.minimumPurchase,
					cartTotal,
				},
				{ status: 400 }
			);
		}

		// 🔹 Calculate discount amount
		let discountAmount = 0;
		if (coupon.discountType === "percentage" && coupon.discountValue) {
			discountAmount = (cartTotal * coupon.discountValue) / 100;
			if (coupon.maxDiscount !== null && coupon.maxDiscount !== undefined) {
				discountAmount = Math.min(discountAmount, coupon.maxDiscount);
			}
		} else if (coupon.discountValue) {
			discountAmount = Math.min(coupon.discountValue, cartTotal); // Ensure discount isn't greater than cart total
		}

		// 🔹 Return response with calculated discount
		return NextResponse.json(
			{
				message: "Coupon applied successfully",
				coupon: {
					_id: coupon._id,
					code: coupon.code,
					discountType: coupon.discountType,
					discountValue: coupon.discountValue,
					discountAmount: discountAmount.toFixed(2),
					cartTotal: cartTotal.toFixed(2),
					finalTotal: (cartTotal - discountAmount).toFixed(2),
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error validating coupon:", error);
		return NextResponse.json(
			{ message: "Error validating coupon", error: (error as Error).message },
			{ status: 500 }
		);
	}
}
