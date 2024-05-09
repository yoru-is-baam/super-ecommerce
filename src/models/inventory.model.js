"use strict";

import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		location: { type: String, default: "Unknown" },
		stock: { type: Number, required: true },
		shopId: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
		reservations: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

export default model(DOCUMENT_NAME, inventorySchema);
