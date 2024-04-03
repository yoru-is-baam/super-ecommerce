"use strict";

import { CREATED, OK } from "../core/success.response.js";
import ProductService from "../services/product.service.js";

export default class ProductController {
	static createProduct = async (req, res, next) => {
		new CREATED({
			message: "Created successfully!",
			metadata: await ProductService.createProduct(req.body.type, {
				...req.body,
				shop: req.user.userId,
			}),
		}).send(res);
	};

	static publishProduct = async (req, res, next) => {
		new OK({
			message: "Published successfully!",
			metadata: await ProductService.publishProduct({
				shop: req.user.userId,
				productId: req.params.id,
			}),
		}).send(res);
	};

	static unpublishProduct = async (req, res, next) => {
		new OK({
			message: "Unpublished successfully!",
			metadata: await ProductService.unpublishProduct({
				shop: req.user.userId,
				productId: req.params.id,
			}),
		}).send(res);
	};

	static getAllDrafts = async (req, res, next) => {
		new OK({
			message: "Get drafts successfully!",
			metadata: await ProductService.findAllDrafts({
				shop: req.user.userId,
			}),
		}).send(res);
	};

	static getAllPublishing = async (req, res, next) => {
		new OK({
			message: "Get published products successfully!",
			metadata: await ProductService.findAllPublishing({
				shop: req.user.userId,
			}),
		}).send(res);
	};

	static searchProducts = async (req, res, next) => {
		new OK({
			message: "Search products successfully!",
			metadata: await ProductService.searchProducts(req.params),
		}).send(res);
	};
}
