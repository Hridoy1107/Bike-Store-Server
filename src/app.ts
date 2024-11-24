import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bikeRoutes } from './app/modules/bike/bike.routes';
import { orderRoutes } from './app/modules/order/order.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', bikeRoutes);
app.use('/api/orders', orderRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Server is working');
};

app.get('/', getController);

export default app;
