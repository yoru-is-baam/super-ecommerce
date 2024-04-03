import "dotenv/config";
import "express-async-errors";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// init middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
import "./dbs/init.mongodb.js";
// import { checkOverload } from "./helpers/check.connect.js";
// checkOverload();

// init router
import routerV1 from "./routes/v1/index.js";

app.use("/api/v1", routerV1);

// handling error
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;

	return res.status(statusCode).json({
		status: "error",
		code: statusCode,
		message: error.message || "Internal Server Error",
	});
});

export default app;
