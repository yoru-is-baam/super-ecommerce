"use strict";

import shopModel from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exists?
      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPassword,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // create privateKey, publicKey
        const accessTokenKey = crypto.randomBytes(64).toString("hex");
        const refreshTokenKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          accessTokenKey,
          refreshTokenKey,
        });
        if (!keyStore) {
          return {
            code: "xxxx",
            message: "keyStore error",
          };
        }

        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          accessTokenKey,
          refreshTokenKey
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default AccessService;
