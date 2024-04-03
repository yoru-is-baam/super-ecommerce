"use strict";

import {
	ProductModel,
	ElectronicModel,
	ClothingModel,
	FurnitureModel,
} from "../index.js";

class ProductRepository {
	static findAllDrafts = async ({ query, limit, skip }) => {
		return await queryProduct({ query, limit, skip });
	};

	static findAllPublishing = async ({ query, limit, skip }) => {
		return await queryProduct({ query, limit, skip });
	};
}

const queryProduct = async ({ query, limit, skip }) => {
	return await ProductModel.find(query)
		.populate("shop", "name email -_id")
		.sort({
			updatedAt: -1,
		})
		.skip(skip)
		.limit(limit)
		.lean();
};

export default ProductRepository;
