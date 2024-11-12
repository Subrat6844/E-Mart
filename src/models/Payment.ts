import mongoose, { Document, Types } from "mongoose";
export interface PaymentMethod extends Document {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	provider: string;
	accountNumber?: string;
	expiryDate?: Date;
	isDefault: boolean;
	createdAt: Date;
}
const paymentMethodSchema = new mongoose.Schema<PaymentMethod>({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	provider: { type: String, required: true },
	accountNumber: String,
	expiryDate: Date,
	isDefault: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

const PaymentModel =
	(mongoose.models?.PaymentMethod as mongoose.Model<PaymentMethod>) ||
	mongoose.model<PaymentMethod>("PaymentMethod", paymentMethodSchema);

export default PaymentModel;