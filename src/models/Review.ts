import mongoose, { Document, Schema } from "mongoose";

interface Review extends Document {
	user: mongoose.Types.ObjectId;
	product: mongoose.Types.ObjectId;
	rating: number;
	comment?: string;
	createdAt: Date;
}

const ReviewSchema = new Schema<Review>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		rating: { type: Number, required: true },
		comment: { type: String },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const ReviewModel=
	(mongoose.models?.Review as mongoose.Model<Review>) ||
	mongoose.model<Review>("Review", ReviewSchema);

export default ReviewModel;