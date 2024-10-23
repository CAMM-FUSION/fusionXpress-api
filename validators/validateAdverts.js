import Joi from "joi";

export const createAdvertValidator = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string()
    });
