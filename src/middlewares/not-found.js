import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req, res, next) => {
	const error = new Error("Not Found");
	error.status = StatusCodes.NOT_FOUND;
	next(error);
};

export default notFoundMiddleware;
