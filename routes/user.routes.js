const express = require("express");
const { createUser, login } = require("../controller/user.controller");
const router = express.Router();

const  User  = require("../model/User.model");




// create user
router.post("/register", createUser);
router.post("/login", login);




module.exports = router;