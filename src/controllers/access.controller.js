"use strict";

import AccessService from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(err);
    }
  };
}

export default new AccessController();
