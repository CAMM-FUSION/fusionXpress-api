import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const vendorSchema = new Schema({
    fullName: { type: String, required: true },
    storeName: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
<<<<<<< HEAD
    role: { type: String, default: 'vendor'}
=======
    user: { type: Types.ObjectId, ref: 'Vendor'},
    role: {type: String, default: 'vendor', enum: ["vendor"] }
>>>>>>> main
    }, {
    timestamps: true
});

vendorSchema.plugin(toJSON);

<<<<<<< HEAD
export const VendorModel = model('vendor', vendorSchema);

export default VendorModel
=======
export const VendorModel = model('Vendor', vendorSchema);
>>>>>>> main
