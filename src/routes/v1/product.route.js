"use strict";

import express from "express";
const router = express.Router();

import ProductController from "../../controllers/product.controller.js";
import ProductValidation from "../../validations/product.validation.js";

import Authentication from "../../middlewares/authentication.js";

router.get(
	"/drafts",
	[Authentication.authenticateToken],
	ProductController.getAllDrafts
);
router.get(
	"/published",
	[Authentication.authenticateToken],
	ProductController.getAllPublishing
);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProduct);
router.get("/search/:searchString", ProductController.searchProducts);

router.use(Authentication.authenticateToken);

router.post("/", ProductController.createProduct);
router.post("/publish/:id", ProductController.publishProduct);
router.post("/unpublish/:id", ProductController.unpublishProduct);

router.patch(
	"/:id",
	[ProductValidation.updateProductValidationMiddleware],
	ProductController.updateProduct
);

export default router;
