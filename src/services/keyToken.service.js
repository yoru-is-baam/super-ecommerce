"use strict";

import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    accessTokenKey,
    refreshTokenKey,
  }) => {
    try {
      const token = await keytokenModel.create({
        user: userId,
        accessTokenKey,
        refreshTokenKey,
      });

      return token ?? null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
