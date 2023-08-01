const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const logger = require("./utils/logger");
const BlogRouter = require("./controllers/blog");
const UserRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("error connecting to MongoDB", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", BlogRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
