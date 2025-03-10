import { dbConnect } from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import CouponModel from "@/models/Coupon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// ✅ GET USER ORDERS (Customer only)
export async function GET() {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || session.user.role !== "customer") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Fetch orders for the authenticated user
		const orders = await OrderModel.find({ user: session.user._id })
			.populate({
				path: "items.product",
				select: "name price images",
			})
			.populate("address");

		return NextResponse.json({ message: "Orders fetched successfully", orders }, { status: 200 });
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
	}
}

// ✅ CREATE AN ORDER (Customer only)
export async function POST(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();
		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Parse request body
		const {
			items,
			address,
			paymentProvider,
			paymentTransactionId,
			couponCode
		}: {
			items: { product: string; quantity: number; size?: string }[];
			address: string;
			paymentProvider: string;
			paymentTransactionId: string;
			couponCode?: string;
		} = await req.json();

		if (!items || items.length === 0) {
			return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
		}

		let subtotal = 0;
		let total = 0;
		let discountAmount = 0;
		let appliedCoupon = null;
		const orderItems = [];

		// Calculate item prices
		for (const item of items) {
			const product = await ProductModel.findById(item.product);
			if (!product) {
				return NextResponse.json({ message: `Product ${item.product} not found` }, { status: 404 });
			}

			const price = product.price;
			const totalItemPrice = price * item.quantity;
			subtotal += totalItemPrice;

			orderItems.push({
				product: item.product,
				quantity: item.quantity,
				price,
				total: totalItemPrice,
			});
		}

		// ✅ APPLY COUPON IF PROVIDED
		if (couponCode) {
			const coupon = await CouponModel.findOne({ code: couponCode, isActive: true });

			if (!coupon) {
				return NextResponse.json({ message: "Invalid or expired coupon" }, { status: 400 });
			}

			// Check if usage limit is exceeded
			if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
				return NextResponse.json({ message: "Coupon usage limit exceeded" }, { status: 400 });
			}

			// Validate minimum purchase requirement
			if (coupon.minimumPurchase && subtotal < coupon.minimumPurchase) {
				return NextResponse.json({ message: `Minimum purchase of ${coupon.minimumPurchase} required` }, { status: 400 });
			}

			// Calculate discount
			if (coupon.discountType === "percentage") {
				discountAmount = Math.min((subtotal * coupon.discountValue) / 100, coupon.maxDiscount || Infinity);
			} else {
				discountAmount = coupon.discountValue;
			}

			// Assign applied coupon
			appliedCoupon = coupon._id;

			// Increase coupon usage count
			await CouponModel.findByIdAndUpdate(coupon._id, { $inc: { usageCount: 1 } });
		}

		// Calculate final total
		total = subtotal - discountAmount;

		// Create the order
		const order = await OrderModel.create({
			user: session.user._id,
			status: "pending",
			paymentStatus: "unpaid",
			paymentProvider,
			paymentTransactionId,
			subtotal,
			discountAmount,
			total,
			coupon: appliedCoupon,
			couponCode,
			address,
			items: orderItems,
		});

		// Remove ordered items from the cart
		await CartModel.updateOne(
			{ user: session.user._id },
			{ $pull: { items: { product: { $in: items.map((i) => i.product) } } } }
		);

		return NextResponse.json({ message: "Order created successfully", order }, { status: 201 });
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json({ message: "Error creating order" }, { status: 500 });
	}
}
