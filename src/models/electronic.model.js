"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Electronic";
const COLLECTION_NAME = "Electronics";

const electronicSchema = new Schema(
	{
		manufacturer: { type: String, required: true },
		model: String,
		color: String,
		shop: { type: Schema.Types.ObjectId, ref: "Shop" },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, electronicSchema);
