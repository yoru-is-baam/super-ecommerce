"use strict";

import _ from "lodash";

export class SerializerService {
	static serializeInfoData = ({ fields = [], object = {} }) => {
		return _.pick(object, fields);
	};

	static serializeSelectData = (select = []) => {
		return Object.fromEntries(select.map((element) => [element, 1]));
	};

	static serializeDeselectData = (select = []) => {
		return Object.fromEntries(select.map((element) => [element, 0]));
	};
}
