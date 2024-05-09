"use strict";

import express from "express";
const router = express.Router();

import AuthController from "../../controllers/auth.controller.js";
import Authentication from "../../middlewares/authentication.js";
import AuthValidation from "../../validations/auth.validation.js";

router.post(
	"/register",
	[AuthValidation.registerValidationMiddleware],
	AuthController.register
);

router.post("/login", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

router.use(Authentication.authenticateToken);

router.post("/logout", AuthController.logout);

export default router;
