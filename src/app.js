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
import "./db/init.mongodb.js";
// import { checkOverload } from "./helpers/check.connect.js";
// checkOverload();

// error handler middlewares
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

// init router
import routerV1 from "./routes/v1/index.js";

app.use("/api/v1", routerV1);

// handling error
app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
