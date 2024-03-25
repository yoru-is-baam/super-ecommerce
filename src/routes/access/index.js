"use strict";

import express from "express";
const router = express.Router();

import accessController from "../../controllers/access.controller.js";

// sign up
router.post("/shop/signup", accessController.signUp);

export default router;
