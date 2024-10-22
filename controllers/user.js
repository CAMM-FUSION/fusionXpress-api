import { signupUserValidator, loginUserValidator, signupVendorValidator, loginVendorValidator, updateProfileValidator } from "../validators/user.js"
import { UserModel } from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { VendorModel } from "../models/vendor.js"

// sign-up logic ( User )
export const signupUser = async (req, res, next) => {
    try {
        console.log('Request Body', req.body);
        // validate user input
        const { error, value } = signupUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        // check if user already exists
        console.log('Checking if User exists')
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10)
        // save user into database
        await UserModel.create({
            ...value,
            password: hashedPassword
        }),
            res.status(201).json('User registered successfully!')
    } catch (error) {
        next(error);
    }
}


// log-in logic
export const loginUser = async (req, res, next) => {
    try {
        // user input validate
        const { error, value } =
            loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ message: 'error' });
        }
        // one user with identifier
        const user = await
            UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        // compare passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Invalid password!' });
        }
        // sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // respond to request
        res.json({
            message: 'Logged in successfully!',
            accessToken: token
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
        next(error);
    }
}


// logout logic
export const logoutUser = (req, res, next) => {
    res.json({ message: 'logged out successfully' });
}



// sign-up logic ( Vendor)
export const signupVendor = async (req, res, next) => {
    try {
        console.log('Request Body', req.body);
        // validate vendor input
        const { error, value } = signupVendorValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }
        // check if vendor already exists
        console.log('Checking if User exists')
        const vendor = await VendorModel.findOne({ email: value.email });
        if (vendor) {
            return res.status(400).json({ message: 'Vendor already exists' })
        }
        // hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10)
        // save user into database
        await VendorModel.create({
            ...value,
            password: hashedPassword
        }),
            res.status(201).json('Vendor registered successfully!')
    } catch (error) {
        next(error);
    }
}


// log-in logic
export const loginVendor = async (req, res, next) => {
    try {
        // vendor input validate
        const { error, value } =
            loginVendorValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ message: 'error' });
        }
        // one vendor with identifier
        const vendor = await
            VendorModel.findOne({ email: value.email });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found!' });
        }
        // compare passwords
        const correctPassword = bcrypt.compareSync(value.password, vendor.password);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Invalid password!' });
        }
        // sign a token for vendor
        const token = jwt.sign(
            { id: vendor.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // respond to request
        res.json({
            message: 'Logged in successfully!',
            accessToken: token
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
        next(error);
    }
}


// Profile logic
export const getProfile = async (req, res, next) => {
    try {
        // find authenticated vendor from
        const vendor = await VendorModel
            .findById(req.auth.id)
            .select({ password: false });
        // respond to request
        res.json(vendor);
    } catch (error) {
        next(error);
    }
}


export const updateProfile = async (req, res, next) => {
    try {
        // validate vendor input
        const { error, value } =
            updateProfileValidator.validate({
                ...req.body,
                avartar: req.file?.filename
            });
        if (error) {
            return res.status(422).json(error);
        }
        // update vendor
        await
            UserModel.findByIdAndUpdate(req.auth.id, value);
        // respond to request
        res.json('vendor profile updated');
    } catch (error) {
        next(error);
    }

}


// logout logic
export const logoutVendor = (req, res, next) => {
    res.json({ message: "Logged out successfully" });
};