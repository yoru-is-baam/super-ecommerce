"use strict";

import apikeyModel from "../models/apikey.model.js";

class ApiKeyService {
  static findById = async (key) => {
    const objKey = await apikeyModel.findOne({ key, status: true }).lean();
    return objKey;
  };
}

export default ApiKeyService;
