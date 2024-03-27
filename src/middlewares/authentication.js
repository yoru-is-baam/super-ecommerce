"use strict";

import { Jwt } from "../utils/index.js";
import { HEADER } from "../constants/header.js";
import { AuthFailureError, NotFoundError } from "../core/error.response.js";
import KeyTokenService from "../services/keyToken.service.js";

class Authentication {
  static authenticateToken = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError("Invalid request");

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundError("Not found key store");

    let accessToken;
    const authHeader = req.headers[HEADER.AUTHORIZATION];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    }
    if (!accessToken) throw new AuthFailureError("Invalid request");

    try {
      console.log(accessToken);
      const decodedUser = Jwt.verifyToken(accessToken, keyStore.accessTokenKey);
      if (userId !== decodedUser.userId)
        throw new AuthFailureError("Invalid user id");

      req.keyStore = keyStore;

      next();
    } catch (error) {
      throw new AuthFailureError("Invalid token");
    }
  };
}

export default Authentication;
