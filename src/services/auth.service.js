"use strict";

import bcrypt from "bcrypt";
import crypto from "node:crypto";

import { KeyTokenService } from "./key-token.service.js";
import { ShopService } from "./shop.service.js";

import { JwtService } from "../common/utils/index.js";
import {
	AuthFailureError,
	BadRequestError,
	ForbiddenError,
} from "../common/core/error.response.js";
import { SHOP_ROLE } from "../common/constants/index.js";

export class AuthService {
	static refreshToken = async (refreshToken) => {
		// check if token has already used
		const foundToken = await KeyTokenService.findKeyToken({
			refreshTokenUsed: refreshToken,
		});
		if (foundToken) {
			await KeyTokenService.removeKeyTokenById(foundToken._id);
			throw new ForbiddenError("Something wrong happened!");
		}

		// check if user has already logged in
		const tokenHolder = await KeyTokenService.findKeyToken({ refreshToken });
		if (!tokenHolder) throw new AuthFailureError("Not logged in");

		// verify token
		const { shopId, email } = JwtService.verifyToken(
			refreshToken,
			tokenHolder.refreshTokenKey
		);

		// check shopId
		const foundShop = await ShopService.findShopById({ id: shopId });
		if (!foundShop) throw new AuthFailureError("Not logged in");

		// create new token pair
		const tokens = JwtService.createTokenPair(
			{ shopId, email },
			tokenHolder.accessTokenKey,
			tokenHolder.refreshTokenKey
		);

		// update tokens
		await tokenHolder.updateOne({
			$set: {
				refreshToken: tokens.refreshToken,
			},
			$addToSet: {
				refreshTokenUsed: refreshToken,
			},
		});

		return {
			shopId,
			tokens,
		};
	};

	static logout = async (keyStore) => {
		return await KeyTokenService.removeKeyTokenById(keyStore._id);
	};

	static login = async ({ email, password, refreshToken = null }) => {
		// check email existence
		const foundShop = await ShopService.findShop({ email }, { password: 1 });
		if (!foundShop) throw new BadRequestError("Shop not registered");

		// check matching password
		const match = await bcrypt.compare(password, foundShop.password);
		if (!match) throw new AuthFailureError("Authentication error");

		// create symmetric key
		const accessTokenKey = crypto.randomBytes(64).toString("hex");
		const refreshTokenKey = crypto.randomBytes(64).toString("hex");

		const { _id: shopId } = foundShop;

		// create access, refresh token
		const tokens = JwtService.createTokenPair(
			{ shopId, email },
			accessTokenKey,
			refreshTokenKey
		);

		await KeyTokenService.createKeyToken({
			shopId,
			refreshToken: tokens.refreshToken,
			accessTokenKey,
			refreshTokenKey,
		});

		return {
			tokens,
		};
	};

	static register = async ({ name, email, password }) => {
		// step 1: check email exists?
		const foundShop = await ShopService.findShop({ email });
		if (foundShop) {
			throw new BadRequestError("Error: Shop already registered!");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const shop = await ShopService.createShop({
			name,
			email,
			password: hashedPassword,
			roles: [SHOP_ROLE.SHOP],
		});

		// create symmetric key
		const accessTokenKey = crypto.randomBytes(64).toString("hex");
		const refreshTokenKey = crypto.randomBytes(64).toString("hex");

		const { _id: shopId } = shop;

		await KeyTokenService.createKeyToken({
			shopId,
			accessTokenKey,
			refreshTokenKey,
		});

		// create token pair
		const tokens = JwtService.createTokenPair(
			{ shopId, email },
			accessTokenKey,
			refreshTokenKey
		);

		return {
			tokens,
		};
	};
}
