"use strict";

import express from "express";
const router = express.Router();

import ProductController from "../../../controllers/product.controller.js";
import Authentication from "../../../middlewares/authentication.js";

router.get("/search/:searchString", ProductController.searchProducts);

router.use(Authentication.authenticateToken);

router.post("/", ProductController.createProduct);

router.post("/publish/:id", ProductController.publishProduct);
router.post("/unpublish/:id", ProductController.unpublishProduct);

// QUERY
router.get("/drafts", ProductController.getAllDrafts);
router.get("/published", ProductController.getAllPublishing);

export default router;
