import express from 'express';
import { OrderControllers } from './order.controllers';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrders);
router.get('/revenue', OrderControllers.getRevenue);

export const orderRoutes = router;
