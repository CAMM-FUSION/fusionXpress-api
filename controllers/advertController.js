import Advert from "../models/advertModel.js";
import mongoose from "mongoose";

// Create a new advert (Vendor only)
export const createAdvert = async (req, res) => {
  try {
    const { title, category, description, price, image } = req.body;

    // Create a new book object with image path
    const newAdvert = new Advert({
      title,
      category,
      description,
      price,
      image
    });

    // Save the new advert to the database
    await newAdvert.save();

    // Send a response with the newly created book
    res.status(201).json({ success: true, message: 'Advert added successfully', data: newAdvert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add advert' });
  }
};

// Update an advert (Vendor only)
export const updateAdvert = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, price, image } = req.body;

    // Validate MongoDB ObjectId (in case it's invalid)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Advert ID' });
    }


    // Prepare the updated data (only update fields that are provided)
    const updatedData = {
      title: title || undefined,
      category: category || undefined,
      description: description || undefined,
      price: price || undefined,
      image: image|| undefined,  // Only update if a new image was uploaded
    };

    // Find the Advert by ID and update it
    const updatedAdvert = await Advert.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!updatedAdvert) return res.status(404).json({ success: false, message: 'Advert not found' });

    // Send the updated book data
    res.status(200).json({ success: true, data: updatedAdvert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update Advert' });
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

    const deleteAdvert = await Advert.findByIdAndDelete(id);  // Delete the book by its ID
    if (!deleteAdvert) {
      return res.status(404).json({ success: false, message: 'Adevrt not found' });
    }

    res.status(200).json({ success: true, message: 'Advert deleted successfully', data: deleteAdvert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete advert' });
  }
};