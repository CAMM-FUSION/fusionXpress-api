export const products = [];
import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String },

    image: { type: String }

    // vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  },
  { timestamps: true },
);

productSchema.plugin(toJSON);

const Product = mongoose.model("Product", productSchema);

export default Product;
