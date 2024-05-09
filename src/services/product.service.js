"use strict";

import {
	ProductModel,
	ElectronicsModel,
	ClothingModel,
	FurnitureModel,
} from "../models/index.js";
import { ProductRepository } from "../models/repositories/index.js";
import {
	BadRequestError,
	NotFoundError,
} from "../common/core/error.response.js";
import { PRODUCT_TYPE } from "../common/constants/index.js";
import { InventoryService } from "./inventory.service.js";

export class ProductFactory {
	static productStrategies = {};

	static registerProduct(type, classRef) {
		ProductFactory.productStrategies[type] = classRef;
	}

	static createProduct = async ({ payload }) => {
		const Product = ProductFactory.productStrategies[payload.type];
		return new Product(payload).createProduct();
	};

	static updateProduct = async ({ shopId, productId, payload }) => {
		const Product = ProductFactory.productStrategies[payload.type];
		return new Product(payload).updateProduct(shopId, productId);
	};

	static publishProduct = async ({ shopId, productId }) => {
		const foundProduct = await ProductRepository.updateProduct({
			payload: { isDraft: false, isPublished: true },
			shopId,
			productId,
			model: ProductModel,
		});
		if (!foundProduct)
			throw new NotFoundError(`No product found with ${productId}`);

		return { productId };
	};

	static unpublishProduct = async ({ shopId, productId }) => {
		const foundProduct = await ProductRepository.updateProduct({
			payload: { isDraft: true, isPublished: false },
			shopId,
			productId,
			model: ProductModel,
		});
		if (!foundProduct)
			throw new NotFoundError(`No product found with ${productId}`);

		return { productId };
	};

	// QUERY
	static findAllDrafts = async ({ shopId, limit = 50, skip = 0 }) => {
		const query = { shop, isDraft: true };
		const products = await ProductRepository.findSpecificProducts({
			query,
			limit,
			skip,
		});
		return { products };
	};

	static findAllPublishing = async ({ shop, limit = 50, skip = 0 }) => {
		const query = { shopId, isPublished: true };
		const products = await ProductRepository.findSpecificProducts({
			query,
			limit,
			skip,
		});
		return { products };
	};

	static searchProducts = async ({ searchString }) => {
		const regexSearch = new RegExp(searchString);
		const results = await ProductModel.find({
			isPublished: true,
			$text: { $search: regexSearch },
		})
			.sort({ score: { $meta: "textScore" } })
			.lean();

		return { products: results };
	};

	static findAllProducts = async ({
		limit = 50,
		sort = "ctime",
		page = 1,
		filter = { isPublished: true },
	}) => {
		const skip = (page - 1) * limit;
		const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
		const products = await ProductModel.find(filter)
			.sort(sortBy)
			.skip(skip)
			.limit(limit)
			.select("name price thumb")
			.lean();

		return { products };
	};

	static findProduct = async ({ productId }) => {
		const product = await ProductModel.findById(productId).select("-__v");

		return { product };
	};
}

class Product {
	constructor({
		name,
		thumb,
		description,
		price,
		quantity,
		type,
		shopId,
		attributes,
	}) {
		this.name = name;
		this.thumb = thumb;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.type = type;
		this.shopId = shopId;
		this.attributes = attributes;
	}

	async createProduct(productId) {
		await ProductModel.create({ ...this, _id: productId });

		await InventoryService.createInventory({
			productId,
			shopId: this.shopId,
			stock: this.quantity,
		});

		return { productId };
	}

	async updateProduct(shopId, productId, payload) {
		return await ProductRepository.updateProduct({
			shopId,
			productId,
			payload,
			model: ProductModel,
		});
	}
}

class Clothing extends Product {
	async createProduct() {
		const clothing = await ClothingModel.create({
			...this.attributes,
			shopId: this.shopId,
		});
		const product = await super.createProduct(clothing._id);

		return { productId: product._id };
	}

	async updateProduct(shopId, productId) {
		const payload = this;

		if (payload.attributes) {
			await ProductRepository.updateProduct({
				shopId,
				productId,
				payload: payload.attributes,
				model: ClothingModel,
			});
		}

		delete payload.attributes;

		await super.updateProduct(shopId, productId, payload);

		return { productId };
	}
}

class Electronics extends Product {
	async createProduct() {
		const electronic = await ElectronicsModel.create({
			...this.attributes,
			shopId: this.shopId,
		});
		const product = await super.createProduct(electronic._id);

		return { productId: product._id };
	}

	async updateProduct(shopId, productId) {
		const payload = this;

		if (payload.attributes) {
			await ProductRepository.updateProduct({
				shopId,
				productId,
				payload: payload.attributes,
				model: ElectronicsModel,
			});
		}

		delete payload.attributes;

		await super.updateProduct(shopId, productId, payload);

		return { productId };
	}
}

class Furniture extends Product {
	async createProduct() {
		const furniture = await FurnitureModel.create({
			...this.attributes,
			shopId: this.shopId,
		});
		const product = await super.createProduct(furniture._id);

		return { productId: product._id };
	}

	async updateProduct(shopId, productId) {
		const payload = this;

		if (payload.attributes) {
			await ProductRepository.updateProduct({
				shopId,
				productId,
				payload: payload.attributes,
				model: FurnitureModel,
			});
		}

		delete payload.attributes;

		await super.updateProduct(shopId, productId, payload);

		return { productId };
	}
}

ProductFactory.registerProduct(PRODUCT_TYPE.ELECTRONICS, Electronics);
ProductFactory.registerProduct(PRODUCT_TYPE.CLOTHING, Clothing);
ProductFactory.registerProduct(PRODUCT_TYPE.FURNITURE, Furniture);
