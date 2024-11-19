import mongoose, { Document, Schema } from "mongoose";

interface Category extends Document {
	name: string;
	description?: string;
	createdAt: Date;
}

const CategorySchema = new Schema<Category>(
	{
		name: { type: String, required: true },
		description: { type: String },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const CategoryModel =
	(mongoose.models?.Category as mongoose.Model<Category>) ||
	mongoose.model<Category>("Category", CategorySchema);
export default CategoryModel;
