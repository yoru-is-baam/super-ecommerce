"use strict";

import { ApiKeyModel } from "../models/index.js";

class ApiKeyService {
	static findById = async (key) => {
		const objKey = await ApiKeyModel.findOne({ key, status: true }).lean();
		return objKey;
	};
}

export default ApiKeyService;
