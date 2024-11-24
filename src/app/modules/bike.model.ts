import { Schema, model } from 'mongoose';
import { Bike } from './bike/bike.interface';

const bikeSchema = new Schema<Bike>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
      validate: {
        validator: (value: number) => value >= 0,
        message: 'Price must be a non-negative value',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message:
          "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'In-stock status is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const BikeModel = model('Bike', bikeSchema);

export default BikeModel;
