export const adverts = [];
import mongoose, { Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String, required: true },

    imageUrl: { type: String },

    vendor: { type: Types.ObjectId, required: true, ref: 'Vendor' },

    // vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  },
  { timestamps: true },
);

advertSchema.plugin(toJSON);

const Advert = mongoose.model("Advert", advertSchema);

export default Advert;
