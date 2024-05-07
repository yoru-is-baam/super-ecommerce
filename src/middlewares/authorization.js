import { ApiKeyService } from "../services/index.js";
import { HEADER } from "../common/constants/index.js";
import { ForbiddenError } from "../common/core/error.response.js";

class Authorization {
	static apiKey = async (req, res, next) => {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) throw new ForbiddenError();

		// check objKey
		const foundApiKey = await ApiKeyService.findById(key);
		if (!foundApiKey) throw new ForbiddenError();

		req.apiKey = foundApiKey;

		next();
	};

	static permission = (permission) => {
		return async (req, res, next) => {
			if (!req.apiKey.permissions)
				throw new ForbiddenError("Permission denied");

			const isPermissionValid = req.apiKey.permissions.includes(permission);
			if (!isPermissionValid) throw new ForbiddenError("Permission denied");

			next();
		};
	};
}

export default Authorization;
