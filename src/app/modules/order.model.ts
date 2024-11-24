import { Schema, model } from 'mongoose';
import { Order } from './order/order.interface';

const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Invalid email format',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [1, 'Total price must be at least 1'],
      validate: {
        validator: (value: number) => value >= 1,
        message: 'Total price must be a positive value',
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;
