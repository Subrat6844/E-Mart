import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
	name: string;
	description?: string;
	sku: string;
	category: mongoose.Types.ObjectId;
	price: number;
	images?: string[];
	status: "active" | "inactive";
	avgRating: number;
	reviewCount: number;
	createdAt: Date;
	updatedAt: Date;
	variants: {
		size: string;
		stock: number;
	}[];
}

const ProductSchema = new Schema<Product>(
	{
		name: { type: String, required: true },
		description: { type: String },
		sku: { type: String, required: true, unique: true },
		category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
		price: { type: Number, required: true },
		images: [{ type: String }],
		status: { type: String, enum: ["active", "inactive"], required: true },
		avgRating: { type: Number, default: 0 }, // Default value set to 0
		reviewCount: { type: Number, default: 0 }, // Default value set to 0
		variants: [
			{
				size: { type: String, required: true },
				stock: { type: Number, default: 0 },
			},
		],
	},
	{ timestamps: true }
);

const ProductModel =
	(mongoose.models?.Product as mongoose.Model<Product>) ||
	mongoose.model<Product>("Product", ProductSchema);
export default ProductModel;
