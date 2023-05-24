const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middlewares/ErrorHandler");
const db = require("./config/db");
const verifyTokenAndUser = require("./middlewares/verifyTokenAndUser");
require("dotenv").config();
const app = express();

const router = express.Router();

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.static('uploads'));

// connect DB
db.connectDb();
// db.syncDb()

// routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the e-learning platform",
    application_mode: process.env.NODE_ENV,


  });
});

app.use("/api", require("./routes"));

app.use("/api/admin",verifyTokenAndUser, require("./routes/admin/admin.routes"));

// global error handler
app.use(ErrorHandler);

module.exports = app

