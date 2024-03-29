const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middlewares/ErrorHandler");
const db = require("./config/db");
const verifyAdmin = require("./middlewares/verifyAdmin");
require("dotenv").config();
const app = express();
const path = require('path');
const { verifyCourse } = require("./controller/verifyCourse.controller");
// middlewares

app.use(express.json());
app.use(cors());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

if (process.env.NODE_ENV === 'development') {

  app.use('/public', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, 'templates')));
} else {

  app.use('/public', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, 'templates')));
}

// connect DB
db.connectDb();
// db.syncDb()

// routes

app.get("/privacypolicy", (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/privacy_policy.html'))
})
app.get("/termsandconditions", (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/terms_and_conditions.html'))
})
app.get("/account-deletion", (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/del.html'))
})

app.get("/test", (req, res) => {

  console.log(path.join(__dirname, "..", 'uploads/courses/thumbnail'))
  res.json({
    message: "Welcome to the e-learning platform",
    application_mode: process.env.NODE_ENV,


  });
});

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/landing.html'))

});


app.get("/verify/:id", verifyCourse);

// global error handler
app.use(ErrorHandler);

module.exports = app

