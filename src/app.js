import compression from "compression";
import express from "express";
import helmet from "helmet";
const app = express();

import morgan from "morgan";

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
import "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";
checkOverload();

// init router
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome",
  });
});

// handling error

export default app;
