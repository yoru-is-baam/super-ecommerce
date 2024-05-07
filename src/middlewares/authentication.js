"use strict";

import { JwtService } from "../common/utils/index.js";
import { HEADER } from "../common/constants/index.js";
import {
	AuthFailureError,
	NotFoundError,
} from "../common/core/error.response.js";
import { KeyTokenService } from "../services/index.js";

class Authentication {
	static authenticateToken = async (req, res, next) => {
		const shopId = req.headers[HEADER.CLIENT_ID];
		if (!shopId) throw new AuthFailureError("Invalid request");

		const keyStore = await KeyTokenService.findKeyToken({ shop: shopId });
		if (!keyStore) throw new NotFoundError("Not found key store");

		let accessToken;
		const authHeader = req.headers[HEADER.AUTHORIZATION];
		if (authHeader && authHeader.startsWith("Bearer ")) {
			accessToken = authHeader.split(" ")[1];
		}
		if (!accessToken) throw new AuthFailureError("Invalid request");

		try {
			const decodedShop = JwtService.verifyToken(
				accessToken,
				keyStore.accessTokenKey
			);
			if (shopId !== decodedShop.shopId)
				throw new AuthFailureError("Invalid shop id");

			req.keyStore = keyStore;
			req.shop = decodedShop;

			next();
		} catch (error) {
			throw new AuthFailureError("Invalid token");
		}
	};
}

export default Authentication;
