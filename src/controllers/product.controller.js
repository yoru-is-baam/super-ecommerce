"use strict";

import { CREATED, OK } from "../common/core/success.response.js";
import { ProductService } from "../services/index.js";

export default class ProductController {
	static createProduct = async (req, res, next) => {
		new CREATED({
			message: "Created successfully!",
			metadata: await ProductService.createProduct({
				payload: {
					...req.body,
					shopId: req.shop.shopId,
				},
			}),
		}).send(res);
	};

	static updateProduct = async (req, res, next) => {
		new OK({
			message: "Update successfully!",
			metadata: await ProductService.updateProduct({
				shopId: req.shop.shopId,
				productId: req.params.id,
				payload: req.body,
			}),
		}).send(res);
	};

	static publishProduct = async (req, res, next) => {
		new OK({
			message: "Published successfully!",
			metadata: await ProductService.publishProduct({
				shopId: req.shop.shopId,
				productId: req.params.id,
			}),
		}).send(res);
	};

	static unpublishProduct = async (req, res, next) => {
		new OK({
			message: "Unpublished successfully!",
			metadata: await ProductService.unpublishProduct({
				shop: req.shop.shopId,
				productId: req.params.id,
			}),
		}).send(res);
	};

	static getAllDrafts = async (req, res, next) => {
		new OK({
			message: "Get drafts successfully!",
			metadata: await ProductService.findAllDrafts({
				shop: req.shop.shopId,
			}),
		}).send(res);
	};

	static getAllPublishing = async (req, res, next) => {
		new OK({
			message: "Get published products successfully!",
			metadata: await ProductService.findAllPublishing({
				shop: req.shop.shopId,
			}),
		}).send(res);
	};

	static searchProducts = async (req, res, next) => {
		new OK({
			message: "Search products successfully!",
			metadata: await ProductService.searchProducts(req.params),
		}).send(res);
	};

	static getAllProducts = async (req, res, next) => {
		new OK({
			message: "Get products successfully!",
			metadata: await ProductService.findAllProducts(req.query),
		}).send(res);
	};

	static getProduct = async (req, res, next) => {
		new OK({
			message: "Get product successfully!",
			metadata: await ProductService.findProduct({ productId: req.params.id }),
		}).send(res);
	};
}
