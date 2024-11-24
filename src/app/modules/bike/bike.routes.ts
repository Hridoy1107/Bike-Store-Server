import express from 'express';
import { bikeControllers } from './bike.controller';

const router = express.Router();

router.post('/', bikeControllers.createBike);
router.get('/', bikeControllers.getAllBikes);
router.get('/search', bikeControllers.getBikesByTerm);
router.get('/:productId', bikeControllers.getBikeById);
router.put('/:productId', bikeControllers.updateBikeById);
router.delete('/:productId', bikeControllers.deleteBike);

export const bikeRoutes = router;
