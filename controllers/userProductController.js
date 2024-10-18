import Product from "../models/productModel.js";


// Search Products
export const searchProducts = async (req, res) => {
  try {
    const { title, category } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all adverts (any user)
export const getProducts = async (req, res) => {
  try {
    const { filter = "{}", limit =10,skip =0 } = req.query;
    const product = await Product
    .find(JSON.parse(filter))
    .sort(JSON.parse())
    .limit(limit)
    .skip(skip);
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
