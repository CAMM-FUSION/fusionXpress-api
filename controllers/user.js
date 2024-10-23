import {
  signupUserValidator,
  loginUserValidator,
} from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";

// sign-up logic ( User )
export const signupUser = async (req, res, next) => {
  try {
    // validate user input
    const { error, value } = signupUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    // check if user already exists
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // save user into database
    await UserModel.create({
      ...value,
      password: hashedPassword,
    }),
      // Send email
      await mailTransporter.sendMail({
        to: value.email,
        subject: "User Registration",
        text: `Welcome! ${value.username} to our shop FusionXpress!`,
      });
    res.status(201).json("User registered successfully!");
  } catch (error) {
    next(error);
  }
};

// log-in logic
export const loginUser = async (req, res, next) => {
  try {
    // user input validate
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: "error" });
    }
    // one user with identifier
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // compare passwords
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    // sign a token for user
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    // respond to request
    res.json({
      message: "Logged in successfully!",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    next(error);
  }
};

// logout logic
export const logoutUser = (req, res, next) => {
  res.json({ message: "logged out successfully" });
};

