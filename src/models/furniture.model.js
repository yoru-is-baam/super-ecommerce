"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Furniture";
const COLLECTION_NAME = "Furniture";

const furnitureSchema = new Schema(
	{
		brand: { type: String, required: true },
		size: String,
		material: String,
		shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, furnitureSchema);
