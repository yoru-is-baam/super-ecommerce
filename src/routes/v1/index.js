"use strict";

import express from "express";
const router = express.Router();

import AccessRouter from "./access/index.js";
import ProductRouter from "./products/index.js";
import Authorization from "../../middlewares/authorization.js";

// router.use(Authorization.apiKey, Authorization.permission("0000"));

router.use("/access", AccessRouter);

router.use("/products", ProductRouter);

export default router;
