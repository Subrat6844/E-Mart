import mongoose, { Schema, Document, Types } from "mongoose";
export interface User extends Document {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: "customer" | "admin";
	createdAt: Date;
	updatedAt: Date;
	userAddress?: Types.ObjectId;
	paymentMethods?: Types.ObjectId[];
}

const userSchema = new Schema<User>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		role: { type: String, enum: ["customer", "admin"], required: true },
		userAddress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Address",
			},
		],
		paymentMethods: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "PaymentMethod",
			},
		],
	},
	{ timestamps: true }
);
const UserModel =
	(mongoose.models?.User as mongoose.Model<User>) ||
	mongoose.model<User>("User", userSchema);

export default UserModel;
