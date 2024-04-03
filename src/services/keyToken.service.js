"use strict";

import { KeyTokenModel } from "../models/index.js";

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		accessTokenKey,
		refreshTokenKey,
		refreshToken = null,
	}) => {
		try {
			const filter = { user: userId },
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
		} catch (error) {
			return error;
		}
	};

	static findByUserId = async (userId) => {
		return await KeyTokenModel.findOne({ user: userId }).lean();
	};

	static removeKeyById = async (id) => {
		return await KeyTokenModel.findByIdAndDelete(id);
	};

	static removeKeyByUserId = async (userId) => {
		return await KeyTokenModel.findOneAndDelete({ user: userId });
	};

	static findByRefreshToken = async (refreshToken) => {
		return await KeyTokenModel.findOne({ refreshToken });
	};

	static findByRefreshTokenUsed = async (refreshToken) => {
		return await KeyTokenModel.findOne({ refreshTokenUsed: refreshToken });
	};
}

export default KeyTokenService;
