import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { VendorModel } from "../models/vendor.js";
import { signupVendorValidator, loginVendorValidator, getProfileValidator, updateProfileValidator } from "../validators/vendor.js";

// Sign-up logic (Vendor)
export const signupVendor = async (req, res, next) => {
  try {
    // Validate vendor input
    const { error, value } = signupVendorValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Check if vendor already exists
    const vendor = await VendorModel.findOne({ email: value.email });
    if (vendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Save user into database
    await VendorModel.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).json("Vendor registered successfully!");
  } catch (error) {
    next(error);
  }
};

// Log-in logic
export const loginVendor = async (req, res, next) => {
  try {
    // Validate vendor input
    const { error, value } = loginVendorValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Find vendor with identifier
    const vendor = await VendorModel.findOne({ email: value.email });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found!" });
    }

    // Compare passwords
    const correctPassword = bcrypt.compareSync(value.password, vendor.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Sign a token for vendor
    const token = jwt.sign({ id: vendor.id, role: vendor.role }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "24h",
    });

    // Respond to request
    res.json({
      message: "Logged in successfully!",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    next(error);
  }
};


// Profile logic
export const getProfile = async (req, res, next) => {
    try {
      // Optional: Validate any incoming data (like query params) using getProfileValidator if needed
      const { error } = getProfileValidator.validate(req.query); // Assuming you want to validate query parameters
      if (error) {
        return res.status(422).json({ message: error.details[0].message });
      }
  
      // Find authenticated vendor
      const vendor = await VendorModel.findById(req.auth.id).select("-password"); // Exclude password field
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found!" });
      }
      
      // Respond to request
      res.json(vendor);
    } catch (error) {
      next(error);
    }
  };

// Update profile logic
export const updateProfile = async (req, res, next) => {
  try {
    // Validate vendor input
    const { error, value } = updateProfileValidator.validate({
      ...req.body,
      avatar: req.file?.filename,
    });
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Update vendor profile
    await VendorModel.findByIdAndUpdate(req.auth.id, value);
    
    // Respond to request
    res.json("Vendor profile updated");
  } catch (error) {
    next(error);
  }
};

// Logout logic
export const logoutVendor = (req, res, next) => {
  res.json({ message: "Logged out successfully" });
};
