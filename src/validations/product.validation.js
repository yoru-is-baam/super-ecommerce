import Joi from "joi";
import Validation from "../middlewares/validation.js";

import { PRODUCT_TYPE } from "../common/constants/index.js";

const clothingSchema = Joi.object({
	brand: Joi.string().trim().strict(),
	size: Joi.string().trim().strict(),
	material: Joi.string().trim().strict(),
});

const electronicsSchema = Joi.object({
	manufacturer: Joi.string().trim().strict(),
	model: Joi.string().trim().strict(),
	color: Joi.string().trim().strict(),
});

const furnitureSchema = Joi.object({
	brand: Joi.string().trim().strict(),
	size: Joi.string().trim().strict(),
	material: Joi.string().trim().strict(),
});

const updateProductSchema = Joi.object({
	price: Joi.number().strict(),
	type: Joi.string()
		.valid(...Object.values(PRODUCT_TYPE))
		.trim()
		.strict()
		.required(),
	attributes: Joi.alternatives().conditional("type", {
		switch: [
			{ is: PRODUCT_TYPE.CLOTHING, then: clothingSchema },
			{ is: PRODUCT_TYPE.ELECTRONICS, then: electronicsSchema },
			{ is: PRODUCT_TYPE.FURNITURE, then: furnitureSchema },
		],
	}),
});

export default {
	updateProductValidationMiddleware:
		Validation.bodyValidationMiddleware(updateProductSchema),
};
