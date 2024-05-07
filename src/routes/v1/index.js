"use strict";

import express from "express";
const router = express.Router();

import AuthRouter from "./auth.route.js";
import ProductRouter from "./product.route.js";
import Authorization from "../../middlewares/authorization.js";

// router.use(Authorization.apiKey, Authorization.permission("0000"));

router.use("/auth", AuthRouter);
router.use("/products", ProductRouter);

export default router;
