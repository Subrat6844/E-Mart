import mongoose, { Document, Schema } from "mongoose";

export interface Coupon extends Document {
	code: string;
	discountType: "percentage" | "fixed";
	discountValue: number;
	minimumPurchase?: number;
	maxDiscount?: number;
	validFrom: Date;
	validUntil: Date;
	usageLimit?: number;
	usageCount: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const CouponSchema = new Schema<Coupon>(
	{
		code: { 
			type: String, 
			required: true, 
			unique: true,
			uppercase: true,
			trim: true 
		},
		discountType: { 
			type: String, 
			required: true, 
			enum: ["percentage", "fixed"] 
		},
		discountValue: { 
			type: Number, 
			required: true,
			min: 0 
		},
		minimumPurchase: { 
			type: Number, 
			default: 0 
		},
		maxDiscount: { 
			type: Number,
			default: null 
		},
		validFrom: { 
			type: Date, 
			required: true 
		},
		validUntil: { 
			type: Date, 
			required: true 
		},
		usageLimit: { 
			type: Number,
			default: null 
		},
		usageCount: { 
			type: Number, 
			default: 0 
		},
		isActive: { 
			type: Boolean, 
			default: true 
		},
	},
	{ timestamps: true }
);

// Add validation to ensure validUntil is after validFrom
CouponSchema.pre('validate', function(next) {
	if (this.validUntil <= this.validFrom) {
		this.invalidate('validUntil', 'End date must be after start date');
	}
	next();
});

// Add validation for percentage discount (0-100)
CouponSchema.pre('validate', function(next) {
	if (this.discountType === 'percentage' && (this.discountValue < 0 || this.discountValue > 100)) {
		this.invalidate('discountValue', 'Percentage discount must be between 0 and 100');
	}
	next();
});

const CouponModel =
	(mongoose.models?.Coupon as mongoose.Model<Coupon>) ||
	mongoose.model<Coupon>("Coupon", CouponSchema);

export default CouponModel;