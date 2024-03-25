"use strict";

import mongoose from "mongoose";
import config from "../configs/config.mongodb.js";

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
console.log(connectionString);

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
