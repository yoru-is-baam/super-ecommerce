"use strict";

import { CREATED, OK } from "../common/core/success.response.js";
import { AuthService } from "../services/index.js";

export default class AuthController {
	static refreshToken = async (req, res, next) => {
		new OK({
			message: "Get tokens success!",
			metadata: await AuthService.refreshToken(req.body.refreshToken),
		}).send(res);
	};

	static logout = async (req, res, next) => {
		await AuthService.logout(req.keyStore);

		new OK({
			message: "Logout success!",
			metadata: {},
		}).send(res);
	};

	static login = async (req, res, next) => {
		new OK({
			message: "Login success!",
			metadata: await AuthService.login(req.body),
		}).send(res);
	};

	static register = async (req, res, next) => {
		new CREATED({
			message: "Registered OK!",
			metadata: await AuthService.register(req.body),
		}).send(res);
	};
}
