"use strict";

import ApiKeyService from "../services/apikey.service.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // check objKey
    const objKey = await ApiKeyService.findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.objKey = objKey;

    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    const isPermissionValid = req.objKey.permissions.includes(permission);
    if (!isPermissionValid) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    return next();
  };
};

export { apiKey, permission };
