import mongoose, { Document, Schema } from "mongoose";

interface Cart extends Document {
	user: mongoose.Types.ObjectId;
	items: CartItem[];
	createdAt: Date;
	updatedAt: Date;
}

interface CartItem {
	product: mongoose.Types.ObjectId;
	quantity: number;
}

const CartSchema = new Schema<Cart>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
);

const CartModel =
	(mongoose.models?.Cart as mongoose.Model<Cart>) ||
	mongoose.model<Cart>("User", CartSchema);

export default CartModel;