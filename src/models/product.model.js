"use strict";

import { model, Schema } from "mongoose";
import slugify from "slugify";
import { PRODUCT_TYPE } from "../common/constants/index.js";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
	{
		name: { type: String, required: true }, // Quan jean cao cap
		thumb: { type: String, required: true },
		description: String,
		slug: String, // quan-jean-cao-cap
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: [...Object.values(PRODUCT_TYPE)],
		},
		shop: { type: Schema.Types.ObjectId, ref: "Shop" },
		rating: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be equal or less than 5.0"],
			set: (val) => Math.round(val * 10) / 10,
		},
		variation: { type: Array, default: [] },
		isDraft: { type: Boolean, default: true, index: true, select: false },
		isPublished: { type: Boolean, default: false, index: true, select: false },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

// create index for search
productSchema.index({ name: "text", description: "text" });

// pre-hook, run before .save() & .create()
productSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

export default model(DOCUMENT_NAME, productSchema);
