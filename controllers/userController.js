import { signupUserValidator, loginUserValidator } from "../validators/user.js";
import { signupVendorValidator, loginVendorValidator } from "../validators/vendor.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";
import { VendorModel } from "../models/vendor.js";

// User signup
export const signupUser = async (req, res, next) => {
    try {
        // Validate User input
        const { error, value } = signupUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json("User already exist!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into database
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmation email
        await mailTransporter.sendMail({
            to: value.email,
            subject: "User Signup",
            text: "User Sign up successful"
        });
        // Respond to request
        res.json("User Signed up")
    } catch (error) {
        next(error);
    }
}

// User login
export const loginUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find one with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json("User does not exist!");
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid Credentials");
        }
        // Sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "24h" }
        );
        // Respond to request
        res.json({
            message: "User logged in!",
            accessToken: token
        });
    } catch (error) {
        next(error);
        
    }
}

// Get user's profile
export const getUserProfile = async (req, res, next) => {
    try {
        console.log(req.auth);
        // Find authenticated user from database
        const user = await UserModel
        .findById(req.auth.id)
        .select({ password: false });
        // Respond to request
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Update user's profile
export const updateUserProfile =  async (req, res, next) => {
    try {
        const { error, value } = updateProfileValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        res.json("User profile updated!");
    } catch (error) {
        next(error); 
    }
}

export const logoutUser = (req, res, next) => {
    res.json("User logged out");
}

// Vendor sign up
export const signupVendor = async (req, res, next) => {
    try {
        // Validate vendor input
        const { error, value } = signupVendorValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if vendor does not exist
        const vendor = await VendorModel.findOne({ email: value.email });
        if (vendor) {
            return res.status(409).json("Vendor already exist!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save vendor into database
        await VendorModel.create({
            ...value,
            password: hashedPassword
        });
        // Send vendor confirmation email
        await mailTransporter.sendMail({
            to: value.email,
            subject: "Vendor Signup",
            text: "Vendor Sign up successful"
        });
        // Respond to request
        res.json("Vendor Signed up")
    } catch (error) {
        next(error);
    }
}

// Vendor login
export const loginVendor = async (req, res, next) => {
    try {
        // Validate vendor input
        const { error, value } = loginVendorValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find one with identifier
        const vendor = await VendorModel.findOne({ email: value.email });
        if (!vendor) {
            return res.status(404).json("Vendor does not exist!");
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, vendor.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid Credentials");
        }
        // Sign a token for vendor
        const token = jwt.sign(
            { id: vendor.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "24h" }
        );
        // Respond to request
        res.json({
            message: "Vendor logged in!",
            accessToken: token
        });
    } catch (error) {
        next(error);
        
    }
}

// Get vendor's profile
export const getVendorProfile = async (req, res, next) => {
    try {
        console.log(req.auth);
        // Find authenticated vendor from database
        const vendor = await VendorModel
        .findById(req.auth.id)
        .select({ password: false });
        // Respond to request
        res.json(vendor);
    } catch (error) {
        next(error);
    }
}

// Update vendor's profile
export const updateVendorProfile =  async (req, res, next) => {
    try {
        const { error, value } = updateVendorProfileValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await VendorModel.findByIdAndUpdate(req.auth.id, value);
        res.json("Vendor profile updated!");
    } catch (error) {
        next(error); 
    }
}

// Vendor logout
export const logoutVendor = (req, res, next) => {
    res.json("Vendor logged out");
}