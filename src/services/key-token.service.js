"use strict";

import { KeyTokenModel } from "../models/index.js";

export class KeyTokenService {
	static createKeyToken = async ({
		shopId,
		accessTokenKey,
		refreshTokenKey,
		refreshToken = null,
	}) => {
		const filter = { shopId },
			update = {
				accessTokenKey,
				refreshTokenKey,
				refreshTokenUsed: [],
				refreshToken,
			},
			options = { upsert: true, new: true };

		const tokens = await KeyTokenModel.findOneAndUpdate(
			filter,
			update,
			options
		);

		return tokens ? tokens.accessTokenKey : null;
	};

	static findKeyToken = async (fields) => {
		return await KeyTokenModel.findOne(fields).lean();
	};

	static removeKeyTokenById = async (id) => {
		return await KeyTokenModel.findByIdAndDelete(id);
	};

	static removeKeyToken = async (fields) => {
		return await KeyTokenModel.findOneAndDelete(fields);
	};
}
