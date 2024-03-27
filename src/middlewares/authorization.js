import ApiKeyService from "../services/apikey.service.js";
import { HEADER } from "../constants/header.js";
import { ForbiddenError } from "../core/error.response.js";

class Authorization {
  static apiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      throw new ForbiddenError();
    }

    // check objKey
    const objKey = await ApiKeyService.findById(key);
    if (!objKey) {
      throw new ForbiddenError();
    }

    req.objKey = objKey;

    next();
  };

  static permission = (permission) => {
    return async (req, res, next) => {
      if (!req.objKey.permissions) {
        throw new ForbiddenError("Permission denied");
      }

      const isPermissionValid = req.objKey.permissions.includes(permission);
      if (!isPermissionValid) {
        throw new ForbiddenError("Permission denied");
      }

      next();
    };
  };
}

export default Authorization;
