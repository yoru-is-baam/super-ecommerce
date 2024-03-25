import "dotenv/config";
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
import router from "./routes/index.js";

app.use("/", router);

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
