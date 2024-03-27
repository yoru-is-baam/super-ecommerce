import JWT from "jsonwebtoken";

export class Jwt {
  static createTokenPair = (payload, accessTokenKey, refreshTokenKey) => {
    const accessToken = JWT.sign(payload, accessTokenKey, {
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, refreshTokenKey, {
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  };

  static verifyToken = (token, key) => {
    const decoded = JWT.verify(token, key);
    return decoded;
  };
}
