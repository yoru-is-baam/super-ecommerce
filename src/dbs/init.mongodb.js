"use strict";

import mongoose from "mongoose";

const connectionString = `mongodb://127.0.0.1:27017/shopDEV`;

import { countConnect } from "../helpers/check.connect.js";

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) => {
        console.log("Connect mongodb successfully");
        countConnect();
      })
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
