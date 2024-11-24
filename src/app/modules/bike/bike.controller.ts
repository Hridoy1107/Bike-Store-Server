import { Request, Response } from 'express';
import { BikeServices } from './bike.service';
import { Bike } from './bike.interface';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
  res: Response
) => {
  const errors = Object.keys(err.errors).reduce(
    (acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    },
    {} as Record<string, string>
  );

  res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: {
      name: err.name,
      errors,
    },
  });
};

const createBike = async (req: Request, res: Response) => {
  try {
    const bikeData = req.body.bike || req.body;

    const result = await BikeServices.createBikeDB(bikeData);

    res.status(201).json({
      message: 'Bike is created successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      handleValidationError(err, res);
    } else {
      res.status(500).json({
        message: 'Error when creating bike',
        success: false,
      });
    }
  }
};

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const result = await BikeServices.getAllBikes();

    res.status(200).json({
      message: 'Bikes are retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when getting bikes',
      success: false,
    });
  }
};

const getBikesByTerm = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    if (!searchTerm) {
      res.status(400).json({
        message: 'searchTerm is required',
        status: false,
      });
    }
    const result = await BikeServices.getBikesByTerm(searchTerm as string);

    res.status(200).json({
      message: 'Bikes are retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when getting bikes',
      success: false,
    });
  }
};

const getBikeById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BikeServices.getBikeById(productId);

    if (!result) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Bike is retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when getting the bike',
      success: false,
    });
  }
};

const updateBikeById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const bikeData: Partial<Bike> = req.body;

    const updatedBike = await BikeServices.updateBikeById(productId, bikeData);

    if (!updatedBike) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Bike is updated successfully',
      status: true,
      data: updatedBike,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      handleValidationError(err, res);
    } else {
      res.status(500).json({
        message: 'Error when updating the bike',
        success: false,
      });
    }
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await BikeServices.deleteBikeById(productId);

    if (!result) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Error when deleting the bike',
      success: false,
    });
  }
};

export const bikeControllers = {
  createBike,
  getAllBikes,
  getBikesByTerm,
  getBikeById,
  updateBikeById,
  deleteBike,
};
