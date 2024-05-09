"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Electronics";
const COLLECTION_NAME = "Electronics";

const electronicsSchema = new Schema(
	{
		manufacturer: { type: String, required: true },
		model: String,
		color: String,
		shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, electronicsSchema);
