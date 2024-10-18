import Joi from "joi";

export const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string()
    });

    const { error } = schema.validate(req.body);
    schema.validate(req.body);
    if (error) return res.status(400).json({ success: false,
        message: error.details[0].message
    });
    next();
}