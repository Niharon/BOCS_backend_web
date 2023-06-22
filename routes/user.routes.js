const express = require("express");
const { createUser, login, forgetPass, checkOtp, resetPassword, getUserNotifications, createRandomUsers, updateUserProfile, updatePassword } = require("../controller/user.controller");
const verifyPrevToken = require("../middlewares/verifyPrevToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();




// BASE URL '/api/user/'




// make a route that will create 50 random users
// router.get("/create-random-users",createRandomUsers)

router.post("/register", createUser);
router.post("/login", login);
router.post("/forget-pass",forgetPass)
router.post("/check-otp",checkOtp);
router.post("/reset-password",resetPassword);
router.get("/notifications",verifyToken,getUserNotifications)
router.patch("/update-profile",verifyToken,updateUserProfile)
router.patch("/update-password",verifyToken,updatePassword)

router.post("/verifyToken",verifyPrevToken)

router.get("/",(req,res)=>{
    res.json({
        message: "Hello From User API"
    })
})




module.exports = router;