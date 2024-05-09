"use strict";

import { ShopModel } from "../models/index.js";

export class ShopService {
	static createShop = async ({ name, email, password, roles }) => {
		return await ShopModel.create({
			name,
			email,
			password,
			roles,
		});
	};

	static findShop = async (
		fields,
		select = {
			email: 1,
			name: 1,
			status: 1,
			roles: 1,
		}
	) => {
		return await ShopModel.findOne(fields).select(select).lean();
	};

	static findShopById = async ({
		id,
		select = {
			email: 1,
			name: 1,
			status: 1,
			roles: 1,
		},
	}) => {
		return await ShopModel.findById(id).select(select).lean();
	};
}
