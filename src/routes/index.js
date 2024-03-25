"use strict";

import express from "express";
const router = express.Router();

import accessRouter from "./access/index.js";
import { apiKey, permission } from "../auth/checkAuth.js";

// // check apiKey
// router.use(apiKey);
// // check permission
// router.use(permission("0000"));

router.use("/v1/api", accessRouter);

export default router;
