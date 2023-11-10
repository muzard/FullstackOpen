const config = require("./utils/config");
const express = require("express");
require("express-async-error");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const helper = require("./utils/logger");
const mongoose = require("mongoose");
const tokenGetter = require("./utils/token");
const userGetter = require("./utils/requestUser");

mongoose.set("strictQuery", false);

helper.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    helper.info("connected to MongoDB");
  })
  .catch((error) => {
    helper.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(tokenGetter);
app.use("/api/blogs", userGetter, blogsRouter);
app.use("/api/users", userGetter, usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
