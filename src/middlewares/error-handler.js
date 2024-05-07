import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
	const statusCode = error.status || 500;

	return res.status(statusCode).json({
		status: "error",
		code: statusCode,
		message: error.message || "Internal Server Error",
	});
};

export default errorHandlerMiddleware;
