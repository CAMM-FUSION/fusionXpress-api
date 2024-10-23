import Joi  from "joi";

// validate signup
export const signupUserValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string()

});

// validate login
export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});



