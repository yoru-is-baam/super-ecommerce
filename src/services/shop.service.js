"use strict";

import ShopModel from "../models/shop.model.js";

class ShopService {
  static create = async ({ name, email, password, roles }) => {
    return await ShopModel.create({
      name,
      email,
      password,
      roles,
    });
  };

  static findByEmail = async ({
    email,
    select = {
      email: 1,
      password: 2,
      name: 1,
      status: 1,
      roles: 1,
    },
  }) => {
    return await ShopModel.findOne({ email }).select(select).lean();
  };
}

export default ShopService;
