import AdvertModel from "../models/advertModel.js";
import { createAdvertValidator, updateAdvertValidator } from "../validators/validateAdverts.js";
import mongoose from "mongoose";


// Search Products
export const searchAdverts = async (req, res) => {
  try {
    const { title, category, price } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (price) query.price = { $regex: price };  
    if (category) query.category = { $regex: category, $options: "i" };
    console.log(query);
    const adverts = await AdvertModel.find(query);
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const createAdvert = async (req, res, next) => {
  try {
    
    // Check for file
    if (!req.file) {
      console.log('No file detected in request');
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Get the image path
    const imagePath = req.file.url || req.file.path || req.file.filename;
    console.log('Image path:', imagePath);

    // Validate inputs
    const { error, value } = createAdvertValidator.validate({
      ...req.body,
      image: imagePath
    });

    if (error) {
      return res.status(422).json(error);
    }

    // Create advert
    const newAdvert = await AdvertModel.create({
      ...value,
      vendor: req.auth.id
    });

    res.status(201).json({
      message: 'Advert added successfully',
      advert: newAdvert
    });
    
  } catch (error) {
    console.error('Error in createAdvert:', error);
    next(error);
  }
};


// Update an advert (Vendor only)
export const updateAdvert = async (req, res, next) => {
  try {
    // Get the advert ID from params
    const { id } = req.params;

    // Check if there's a new image file
    const imageUpdate = req.file ? 
      { image: req.file.url || req.file.path || req.file.filename } : 
      {};

    // Validate the update data
    const { error, value } = createAdvertValidator.validate({
      ...req.body,
      ...imageUpdate
    });

    if (error) {
      return res.status(422).json(error);
    }

    // Update the advert
    const updatedAdvert = await AdvertModel.findOneAndUpdate(
      { _id: id, vendor: req.auth.id },  // Only update if advert belongs to this vendor
      { ...value },
      { new: true }  // Return the updated document
    );

    if (!updatedAdvert) {
      return res.status(404).json({ message: 'Advert not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Advert updated successfully',
      advert: updatedAdvert
    });

  } catch (error) {
    next(error);
  }
};



// Delete an advert (Vendor only)
export const deleteAdvert = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Advert ID' });
    }

    const deleteAdvert = await AdvertModel.findByIdAndDelete(id);  // Delete the book by its ID
    if (!deleteAdvert) {
      return res.status(404).json({ success: false, message: 'Advert not found' });
    }

    res.status(200).json({ success: true, message: 'Advert deleted successfully', data: deleteAdvert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete Advert' });
  }
};

// Get adverts by category
export const getAdvertsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const adverts = await AdvertModel.find({ category });

    if (!adverts.length) {
      return res.status(404).json({ message: 'No adverts found for this category' });
    }

    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
};

// Get all adverts (any user)
export const getAdverts = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}", limit =10,skip =0 } = req.query;
    const advert = await AdvertModel
    .find(JSON.parse(filter))
    .sort(JSON.parse(sort))
    .limit(limit)
    .skip(skip);
    res.status(200).json({ success: true, data: advert });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Adverts" });
  }
};


// Count all adverts (any user)
export const countAdverts = async (req, res, next) => {
  try {
    const { filter = '{}' } = req.query;
    // Count adverts in database
    const count = await AdvertModel.countDocuments(JSON.parse(filter));
    // Send response
    res.status({ count });
  } catch (error) {
      next(error);
  }
}

// Get a single advert (any user)
export const getAdvert = async (req, res) => {
  try {
    const advert = await AdvertModel.findById(req.params.id);
    if (!advert)
      return res
        .status(404)
        .json({ success: false, message: "Advert not found" });
    res.status(200).json({ success: true, data: advert });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Advert" });
  }
};