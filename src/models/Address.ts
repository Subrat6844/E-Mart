import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./User";
export interface Address extends Document {
	_id: Types.ObjectId;
	user: Types.ObjectId | User;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	type: "billing" | "shipping";
	createdAt: Date;
}
const addressSchema = new Schema<Address>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		addressLine1: String,
		addressLine2: String,
		city: String,
		state: String,
		country: String,
		postalCode: String,
		type: { type: String, enum: ["billing", "shipping"], default: "shipping" },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const AddressModel =
	(mongoose.models?.Address as mongoose.Model<Address>) ||
	mongoose.model<Address>("Address", addressSchema);

export default AddressModel;
