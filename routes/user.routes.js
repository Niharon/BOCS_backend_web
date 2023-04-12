const express = require("express");
const { createUser, login } = require("../controller/user.controller");
const router = express.Router();

const  User  = require("../models/User.model");




// create user

router.post("/register", createUser);
router.post("/login", login);

router.get("/",(req,res)=>{
    res.json({
        message: "Hello From User API"
    })
})




module.exports = router;