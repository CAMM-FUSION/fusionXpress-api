import Joi  from "joi";

// validate signup
export const signupUserValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()

});

// validate login
export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// validate signup
export const signupVendorValidator = Joi.object({
    fullName: Joi.string().required(),
    storeName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid( 'vendor' )

});

// validate login
export const loginVendorValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


// validate updateDashboard
export const updateVendorProfileValidator = Joi.object({
    fullName: Joi.string(),
    image: Joi.string(),
    phoneNumber: Joi.number(),
});