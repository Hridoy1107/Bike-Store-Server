import BikeModel from '../bike.model';
import { Bike } from './bike.interface';

const createBikeDB = async (bike: Bike) => {
  const result = await BikeModel.create(bike);
  return result;
};

const getAllBikes = async () => {
  const result = await BikeModel.find();
  return result;
};

const getBikesByTerm = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await BikeModel.find({
    $or: [
      { name: { $regex: regex } },
      { brand: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  });

  return result;
};

const getBikeById = async (productId: string) => {
  const bike = await BikeModel.findById(productId).exec();
  return bike;
};

const updateBikeById = async (productId: string, bikeData: Partial<Bike>) => {
  const updatedBike = await BikeModel.findByIdAndUpdate(
    productId,
    { $set: bikeData },
    { new: true, runValidators: true }
  ).exec();

  return updatedBike;
};

const deleteBikeById = async (productId: string) => {
  const result = await BikeModel.findByIdAndDelete(productId);
  return result;
};

export const BikeServices = {
  createBikeDB,
  getAllBikes,
  getBikesByTerm,
  getBikeById,
  updateBikeById,
  deleteBikeById,
};
