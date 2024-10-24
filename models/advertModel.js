export const adverts = [];
import { Types, model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const advertSchema = new Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String, required: true },

    image: { type: String, required : true },

    vendor: { type: Types.ObjectId, required: true, ref: "Vendor" },

    // vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  },
  { timestamps: true },
);

advertSchema.plugin(toJSON);

const AdvertModel = model("Advert", advertSchema);

export default AdvertModel;
