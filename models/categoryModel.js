import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    }
});

// Apply toJSON plugin
categorySchema.plugin(toJSON);

export const Category = mongoose.model('Category', categorySchema);