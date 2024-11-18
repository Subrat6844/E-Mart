import mongoose, { Document, Schema } from "mongoose";

interface Order extends Document {
    user: mongoose.Types.ObjectId;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid';
    total: number;
    address: mongoose.Types.ObjectId;
    paymentMethod: mongoose.Types.ObjectId;
    items: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  const OrderSchema = new Schema<Order>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], required: true },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], required: true },
    total: { type: Number, required: true },
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  }, { timestamps: true });
  
  export const Order = mongoose.model<Order>('Order', OrderSchema);
  
  interface OrderItem extends Document {
    order: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
  }
  
  const OrderItemSchema = new Schema<OrderItem>({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  });
  
  export const OrderItem = mongoose.model<OrderItem>('OrderItem', OrderItemSchema);
  