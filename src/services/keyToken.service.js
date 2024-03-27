"use strict";

import keytokenModel from "../models/keytoken.model.js";

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

      const tokens = await keytokenModel.findOneAndUpdate(
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
    return await keytokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (id) => {
    return await keytokenModel.findByIdAndDelete(id);
  };

  static removeKeyByUserId = async (userId) => {
    return await keytokenModel.findOneAndDelete({ user: userId });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken });
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshTokenUsed: refreshToken });
  };
}

export default KeyTokenService;
