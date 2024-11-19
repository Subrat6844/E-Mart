import mongoose, { Document, Schema } from "mongoose";

interface Category extends Document {
	name: string;
	description?: string;
	parentCategory?: mongoose.Types.ObjectId;
	createdAt: Date;
}

const CategorySchema = new Schema<Category>(
	{
		name: { type: String, required: true },
		description: { type: String },
		parentCategory: { type: Schema.Types.ObjectId, ref: "Category",default: null },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const CategoryModel =
	(mongoose.models?.Category as mongoose.Model<Category>) ||
	mongoose.model<Category>("Category", CategorySchema);
export default CategoryModel;
