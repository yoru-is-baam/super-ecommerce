"use strict";

import { CREATED, OK } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

export default class AccessController {
  static refreshToken = async (req, res, next) => {
    new OK({
      message: "Get tokens success!",
      metadata: await AccessService.refreshToken(req.body.refreshToken),
    }).send(res);
  };

  static logout = async (req, res, next) => {
    await AccessService.logout(req.keyStore);

    new OK({
      message: "Logout success!",
      metadata: {},
    }).send(res);
  };

  static login = async (req, res, next) => {
    new OK({
      message: "Login success!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  static signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}
