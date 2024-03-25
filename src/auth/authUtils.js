"use strict";

import JWT from "jsonwebtoken";

const createTokenPair = async (payload, accessTokenKey, refreshTokenKey) => {
  try {
    // accessToken
    const accessToken = JWT.sign(payload, accessTokenKey, {
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, refreshTokenKey, {
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

export { createTokenPair };
