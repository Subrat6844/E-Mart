import mongoose, { Document, Schema } from "mongoose";

export interface Cart extends Document {
	user: mongoose.Types.ObjectId;
	items: CartItem[];
	createdAt: Date;
	updatedAt: Date;
}

interface CartItem {
	product: mongoose.Types.ObjectId;
	name: string;
	quantity: number;
	size?: string;
	price?: number;
	image?: string;
}
const CartItemSchema = new Schema<CartItem>({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	name: { type: String, required: true },
	quantity: { type: Number, required: true, min: 1 },
	size: { type: String },
	price: { type: Number },
	image: { type: String },
});

const CartSchema = new Schema<Cart>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [CartItemSchema],
	},
	{ timestamps: true }
);

const CartModel =
	(mongoose.models?.Cart as mongoose.Model<Cart>) ||
	mongoose.model<Cart>("Cart", CartSchema);

export default CartModel;
