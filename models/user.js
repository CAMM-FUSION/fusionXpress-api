import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
// import { required, string } from "joi";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    }, {
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);