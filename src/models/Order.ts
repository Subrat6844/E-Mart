import mongoose, { Document, Schema, Types } from "mongoose";

// OrderItem Interface and Schema
interface OrderItem extends Document {
	product: Types.ObjectId;
	quantity: number;
	size?: string;
	price: number;
	total: number;
}

const OrderItemSchema = new Schema<OrderItem>({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true },
	size: { type: String },
	price: { type: Number, required: true },
	total: { type: Number, required: true },
});

// Order Interface and Schema
interface Order extends Document {
	user: Types.ObjectId;
	status: "pending" | "shipped" | "delivered" | "cancelled";
	paymentStatus: "paid" | "unpaid";
	paymentProvider: string;
	paymentTransactionId: string;
	total: number;
	subtotal: number;
	discountAmount: number;
	coupon?: Types.ObjectId;
	couponCode?: string;
	address: Types.ObjectId;
	items: OrderItem[];
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<Order>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		paymentStatus: {
			type: String,
			enum: ["paid", "unpaid"],
			default: "unpaid",
		},
		paymentProvider: { type: String }, // e.g., Stripe, PayPal
		paymentTransactionId: { type: String }, // ID from the payment gateway
		subtotal: { type: Number, required: true }, // Price before discount
		discountAmount: { type: Number, default: 0 }, // Discount amount from coupon
		total: { type: Number, required: true }, // Final price after discount
		coupon: { type: Schema.Types.ObjectId, ref: "Coupon" }, // Reference to the coupon used
		couponCode: { type: String }, // Store the coupon code for reference
		address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
		items: [OrderItemSchema], // Embedded OrderItem schema
	},
	{ timestamps: true }
);

// Models
const OrderModel =
	mongoose.models?.Order || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
