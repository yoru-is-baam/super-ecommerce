import { BadRequestError } from "../common/core/error.response.js";

export default class Validation {
	static #validationMiddleware = (schema, source) => (req, res, next) => {
		const { error, value } = schema.validate(req[source], {
			abortEarly: false,
			errors: { label: "key", wrap: { label: false } },
		});

		if (!error) {
			next();
		} else {
			const fields = error.details.reduce((obj, item) => {
				obj[item.context.key] = item.message;
				return obj;
			}, {});
			console.log(fields);
			throw new BadRequestError(fields);
		}
	};

	static bodyValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "body");

	static paramValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "params");

	static queryValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "query");
}
