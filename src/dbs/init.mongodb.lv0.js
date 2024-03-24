"use strict";

import mongoose from "mongoose";

const connectionString = `mongodb://127.0.0.1:27017/shopDEV`;

mongoose
  .connect(connectionString)
  .then((_) => console.log("Connect mongodb successfully"))
  .catch((err) => console.log(err));

// dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

export default mongoose;
