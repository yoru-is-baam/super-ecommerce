import app from "./src/app.js";
import config from "./src/configs/config.mongodb.js";

const PORT = config.app.port || 3056;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with port ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log(`Exit Server Express`));
// });
