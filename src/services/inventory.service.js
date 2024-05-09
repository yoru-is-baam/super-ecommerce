"use strict";

import { InventoryModel } from "../models/index.js";

export class InventoryService {
	static createInventory = async ({
		productId,
		shopId,
		stock,
		location = "Unknown",
	}) => {
		return await InventoryModel.create({
			productId,
			shopId,
			stock,
			location,
		});
	};
}
