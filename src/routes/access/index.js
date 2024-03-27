"use strict";

import express from "express";
const router = express.Router();

import AccessController from "../../controllers/access.controller.js";
import Authentication from "../../middlewares/authentication.js";

// sign up
router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.login);
router.post(
  "/shop/logout",
  Authentication.authenticateToken,
  AccessController.logout
);
router.post(
  "/shop/refresh-token",
  Authentication.authenticateToken,
  AccessController.refreshToken
);

export default router;
