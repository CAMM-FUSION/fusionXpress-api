import AdvertModel from "../models/advertModel.js";
import { createAdvertValidator } from "../validators/validateAdverts.js";


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

// Create a new advert (Vendor only)
// export const createAdvert = async (req, res) => {
//   try {
//     const { title, category, description, price, image } = req.body;

//     // Create a new book object with image path
//     const newAdvert = new Advert({
//       title,
//       category,
//       description,
//       price: Number(price),
//       image
//     });

//     // Save the new advert to the database
//     await newAdvert.save();

//     // Send a response with the newly created book
//     res.status(201).json({ success: true, message: 'Advert added successfully', data: newAdvert });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to add advert' });
//   }
// };

export const createAdvert = async (req, res, next) => {
  try {
    // Validate Vendor input
    const { error, value } = createAdvertValidator.validate({
      ...req.body,
        image: req.file?.filename
    });
    if (error) {
      return res.status(422).json(error);
    }
    //  Write advert to database
    await AdvertModel.create({
      ...value,
      vendor: req.auth.id
    })
    // Send a success response
    res.status(201).json('Advert added successfully');
  } catch (error) {
    next(error);
  }
}

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
    const updatedAdvert = await AdvertModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

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
    const advert = await Advert
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
    if (!product)
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