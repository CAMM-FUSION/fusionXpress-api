import Product from "../models/productModel.js";

// Get all adverts (any user)
export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Products" });
  }
};

// Get a single advert (any user)
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: advert });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Product" });
  }
};
