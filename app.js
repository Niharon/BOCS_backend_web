const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middlewares/ErrorHandler");
const db = require("./config/db");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.static('uploads'));

// connect DB
db.connectDb();
// db.syncDb()

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", require("./routes"));

app.use("/api/admin", require("./routes/admin/admin.routes"));

// global error handler
app.use(ErrorHandler);

module.exports = app

