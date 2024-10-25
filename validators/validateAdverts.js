import Joi from "joi";

export const createAdvertValidator = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required()
    });

export const updateAdvertValidator = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        image: Joi.string()
    });
