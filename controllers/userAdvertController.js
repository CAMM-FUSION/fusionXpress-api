import Advert from "../models/advertModel.js";


// Search Products
export const searchAdverts = async (req, res) => {
  try {
    const { title, category } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    const adverts = await Advert.find(query);
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Get all adverts (any user)
export const getAdverts = async (req, res) => {
  try {
    const { filter = '{}', limit = 10, skip = 0 } = req.query;
    const advert = await Advert
    .find(JSON.parse(filter))
    .sort(JSON.parse())
    .limit(limit)
    .skip(skip);
    res.status(200).json({ success: true, data: advert });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch adverts" });
  }
};

// Get a single advert (any user)
export const getAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert)
      return res
        .status(404)
        .json({ success: false, message: "advert not found" });
    res.status(200).json({ success: true, data: advert });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch advert" });
  }
};
