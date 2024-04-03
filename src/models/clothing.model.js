"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Clothing";
const COLLECTION_NAME = "Clothes";

const clothingSchema = new Schema(
	{
		brand: { type: String, required: true },
		size: String,
		material: String,
		shop: { type: Schema.Types.ObjectId, ref: "Shop" },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, clothingSchema);
