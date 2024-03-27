"use strict";

import express from "express";
const router = express.Router();

import accessRouter from "./access/index.js";
import Authorization from "../middlewares/authorization.js";

router.use(
  "/v1/api",
  // [Authorization.apiKey, Authorization.permission("0000")],
  accessRouter
);

export default router;
