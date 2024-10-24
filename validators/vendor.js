import Joi  from "joi";

// validate signup
export const signupVendorValidator = Joi.object({
    fullName: Joi.string().required(),
    storeName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()

});

// validate login
export const loginVendorValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Validate get profile
export const getProfileValidator = Joi.object({
    email: Joi.string(),
    password: Joi.string()
});

// validate update profile
export const updateProfileValidator = Joi.object({
    name: Joi.string(),
    image: Joi.string(),
    
});