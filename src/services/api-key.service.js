"use strict";

import { ApiKeyModel } from "../models/index.js";

export class ApiKeyService {
	static findById = async (key) => {
		return await ApiKeyModel.findOne({ key, status: true }).lean();
	};
}
