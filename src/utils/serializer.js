"use strict";

import _ from "lodash";

export class Serializer {
  static serializeInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
  };
}
