"use strict";

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

import { DISCOUNT_TYPE, APPLIES_TO } from "../common/constants/index.js";

const discountSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: DISCOUNT_TYPE.FIXED_AMOUNT,
			enum: [...Object.values(DISCOUNT_TYPE)],
		},
		value: {
			type: Number,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		appliedUsers: {
			type: Array,
			default: [],
		},
		maxUsagePerUser: {
			type: Number,
			required: true,
		},
		minOrderValue: {
			type: Number,
			required: true,
		},
		shopId: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		appliesTo: {
			type: String,
			required: true,
			enum: [...Object.values(APPLIES_TO)],
		},
		productIds: {
			type: Array,
			default: [],
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, discountSchema);
