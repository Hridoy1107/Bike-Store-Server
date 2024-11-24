import OrderModel from '../order.model';
import BikeModel from '../bike.model';
import { Order } from './order.interface';

const createOrder = async (orderData: Order) => {
  const bike = await BikeModel.findById(orderData.product);

  if (!bike) {
    throw new Error('Bike not found');
  }

  if (bike.quantity === 0) {
    throw new Error('Bike is out of stock');
  }

  if (orderData.quantity > bike.quantity) {
    throw new Error(
      `Requested quantity (${orderData.quantity}) exceeds available stock (${bike.quantity})`
    );
  }

  const order = await OrderModel.create(orderData);

  bike.quantity -= orderData.quantity;

  if (bike.quantity === 0) {
    bike.inStock = false;
  }
  await bike.save();

  return order;
};

const getAllOrders = async () => {
  const result = await OrderModel.find();
  return result;
};

const calculateTotalRevenue = async () => {
  const orders = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);

  return orders.length > 0 ? orders[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  calculateTotalRevenue,
};
