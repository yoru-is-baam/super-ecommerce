import Joi from "joi";
import Validation from "../middlewares/validation.js";

const registerSchema = Joi.object({
	email: Joi.string().required().email().trim().strict(),
	name: Joi.string().required().trim().strict(),
	password: Joi.string()
		.required()
		.min(6)
		.trim()
		.strict()
		.error((errors) => {
			errors.forEach((err) => {
				switch (err.code) {
					case "string.min":
						err.message = "password is invalid";
						break;
					default:
						break;
				}
			});
			return errors;
		}),
});

export default {
	registerValidationMiddleware:
		Validation.bodyValidationMiddleware(registerSchema),
};
