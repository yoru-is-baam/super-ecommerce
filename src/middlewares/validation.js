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
			const message = error.details.map((field) => field.message).join(", ");
			throw new BadRequestError(message);
		}
	};

	static bodyValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "body");

	static paramValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "params");

	static queryValidationMiddleware = (schema) =>
		Validation.#validationMiddleware(schema, "query");
}
