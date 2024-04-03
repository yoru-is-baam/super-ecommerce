"use strict";

import {
	ProductModel,
	ElectronicModel,
	ClothingModel,
	FurnitureModel,
} from "../models/index.js";
import { ProductRepository } from "../models/repository/index.js";
import { BadRequestError, NotFoundError } from "../core/error.response.js";
import { Types } from "mongoose";

class ProductFactory {
	static productRegistry = {};

	static registerProductType(type, classRef) {
		ProductFactory.productRegistry[type] = classRef;
	}

	static createProduct = async (type, payload) => {
		const productClass = ProductFactory.productRegistry[type];
		if (!productClass) throw new BadRequestError(`Invalid ${type}`);

		return new productClass(payload).createProduct();
	};

	static publishProduct = async ({ shop, productId }) => {
		const foundProduct = await ProductModel.findOneAndUpdate(
			{
				shop: new Types.ObjectId(shop),
				_id: new Types.ObjectId(productId),
			},
			{ isDraft: false, isPublished: true }
		).lean();
		if (!foundProduct)
			throw new NotFoundError(`No product found with ${productId}`);

		return { productId };
	};

	static unpublishProduct = async ({ shop, productId }) => {
		const foundProduct = await ProductModel.findOneAndUpdate(
			{
				shop: new Types.ObjectId(shop),
				_id: new Types.ObjectId(productId),
			},
			{ isDraft: true, isPublished: false }
		).lean();
		if (!foundProduct)
			throw new NotFoundError(`No product found with ${productId}`);

		return { productId };
	};

	// QUERY
	static findAllDrafts = async ({ shop, limit = 50, skip = 0 }) => {
		const query = { shop, isDraft: true };
		const products = await ProductRepository.findAllDrafts({
			query,
			limit,
			skip,
		});
		return { products };
	};

	static findAllPublishing = async ({ shop, limit = 50, skip = 0 }) => {
		const query = { shop, isPublished: true };
		const products = await ProductRepository.findAllPublishing({
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
}

class Product {
	constructor({
		name,
		thumb,
		description,
		price,
		quantity,
		type,
		shop,
		attributes,
	}) {
		this.name = name;
		this.thumb = thumb;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.type = type;
		this.shop = shop;
		this.attributes = attributes;
	}

	async createProduct(productId) {
		return await ProductModel.create({ ...this, _id: productId });
	}
}

class Clothing extends Product {
	async createProduct() {
		const clothing = await ClothingModel.create({
			...this.attributes,
			shop: this.shop,
		});
		if (!clothing) throw new BadRequestError("Create clothing error");

		const product = await super.createProduct(clothing._id);
		if (!product) throw new BadRequestError("Create product error");

		return { productId: product._id };
	}
}

class Electronic extends Product {
	async createProduct() {
		const electronic = await ElectronicModel.create({
			...this.attributes,
			shop: this.shop,
		});
		if (!electronic) throw new BadRequestError("Create electronic error");

		const product = await super.createProduct(electronic._id);
		if (!product) throw new BadRequestError("Create product error");

		return { productId: product._id };
	}
}

class Furniture extends Product {
	async createProduct() {
		const furniture = await FurnitureModel.create({
			...this.attributes,
			shop: this.shop,
		});
		if (!furniture) throw new BadRequestError("Create furniture error");

		const product = await super.createProduct(furniture._id);
		if (!product) throw new BadRequestError("Create product error");

		return { productId: product._id };
	}
}

ProductFactory.registerProductType("Electronics", Electronic);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furniture", Furniture);

export default ProductFactory;
