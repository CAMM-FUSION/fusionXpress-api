export const adverts = [];
import mongoose from "mongoose";

const advertSchema = new mongoose.Schema(
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

const Advert = mongoose.model("Advert", advertSchema);

export default Advert;
