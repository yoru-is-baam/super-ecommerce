"use strict";

import bcrypt from "bcrypt";
import crypto from "node:crypto";

import KeyTokenService from "./keyToken.service.js";
import ShopService from "./shop.service.js";

import { Jwt } from "../utils/index.js";
import {
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
} from "../core/error.response.js";
import { ShopRole } from "../constants/index.js";

class AccessService {
  static refreshToken = async (refreshToken) => {
    // check if token has already used
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      const { userId } = Jwt.verifyToken(
        refreshToken,
        foundToken.refreshTokenKey
      );
      await KeyTokenService.removeKeyByUserId(userId);
      throw new ForbiddenError("Something wrong happened!");
    }

    // check if user has already logged in
    const tokenHolder = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!tokenHolder) throw new AuthFailureError("Not logged in");

    // verify token
    const { userId, email } = Jwt.verifyToken(
      refreshToken,
      tokenHolder.refreshTokenKey
    );

    // check userId
    const foundShop = await ShopService.findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Not logged in");

    // create new token pair
    const tokens = Jwt.createTokenPair(
      { userId, email },
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
      userId,
      tokens,
    };
  };

  static logout = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  };

  static login = async ({ email, password, refreshToken = null }) => {
    // check email existence
    const foundShop = await ShopService.findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");

    // check matching password
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error");

    // create symmetric key
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = foundShop;

    // create access, refresh token
    const tokens = Jwt.createTokenPair(
      { userId, email },
      accessTokenKey,
      refreshTokenKey
    );

    await KeyTokenService.createKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      accessTokenKey,
      refreshTokenKey,
    });

    return {
      userId,
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    // step 1: check email exists?
    const shopHolder = await ShopService.findByEmail({ email });
    if (shopHolder) {
      throw new BadRequestError("Error: Shop already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newShop = await ShopService.create({
      name,
      email,
      password: hashedPassword,
      roles: [ShopRole.SHOP],
    });

    if (newShop) {
      // create privateKey, publicKey
      const accessTokenKey = crypto.randomBytes(64).toString("hex");
      const refreshTokenKey = crypto.randomBytes(64).toString("hex");

      const { _id: userId } = newShop;

      await KeyTokenService.createKeyToken({
        userId,
        accessTokenKey,
        refreshTokenKey,
      });

      // create token pair
      const tokens = Jwt.createTokenPair(
        { userId, email },
        accessTokenKey,
        refreshTokenKey
      );

      return {
        userId,
        tokens,
      };
    }

    return {
      userId,
    };
  };
}

export default AccessService;
