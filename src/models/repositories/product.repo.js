"use strict";

import { ProductModel } from "../index.js";
import { Types } from "mongoose";

export class ProductRepository {
	static updateProduct = async ({ shop, productId, payload, model }) => {
		return await model
			.findOneAndUpdate(
				{
					shop: new Types.ObjectId(shop),
					_id: new Types.ObjectId(productId),
				},
				payload
			)
			.lean();
	};

	static findSpecificProducts = async ({ query, limit, skip }) => {
		return await ProductModel.find(query)
			.populate("shop", "name email -_id")
			.sort({
				updatedAt: -1,
			})
			.skip(skip)
			.limit(limit)
			.lean();
	};
}
