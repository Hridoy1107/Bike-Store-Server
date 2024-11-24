import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format');
    }

    if (!product) {
      errors.push('Product is required');
    }

    if (quantity == null) {
      errors.push('Quantity is required');
    } else if (typeof quantity !== 'number' || quantity < 1) {
      errors.push('Quantity must be a number and at least 1');
    }

    if (totalPrice == null) {
      errors.push('Total price is required');
    } else if (typeof totalPrice !== 'number' || totalPrice < 1) {
      errors.push('Total price must be a number and at least 1');
    }

    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation error',
        status: false,
        errors,
      });
    }

    const order = await OrderServices.createOrder(req.body);

    res.status(200).json({
      message: 'Order is created successfully',
      status: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message || 'Error when creating order',
      status: false,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrders();

    res.status(200).json({
      message: 'Orders are retrieved successfully',
      status: true,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when retrieving orders',
      status: false,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when retrieving revenue',
      status: false,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getRevenue,
};
