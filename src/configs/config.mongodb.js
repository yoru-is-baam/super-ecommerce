"use strict";

// level 0
// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "127.0.0.1",
//     port: 27017,
//     name: "db",
//   },
// };

// level 01
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDEV",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST || "127.0.0.1",
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || "shopPROD",
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || "dev";

export default config[env];
