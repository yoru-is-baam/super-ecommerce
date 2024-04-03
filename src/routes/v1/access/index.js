"use strict";

import express from "express";
const router = express.Router();

import AccessController from "../../../controllers/access.controller.js";
import Authentication from "../../../middlewares/authentication.js";

// sign up
router.post("/signup", AccessController.signUp);
router.post("/login", AccessController.login);
router.post("/refresh-token", AccessController.refreshToken);

router.use(Authentication.authenticateToken);

router.post("/logout", AccessController.logout);

export default router;
