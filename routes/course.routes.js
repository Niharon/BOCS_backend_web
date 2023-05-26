const express = require("express");
const { getAllCourses, getCourseDetailsById, requestCourse } = require("../controller/userCourse.controller");
const verifyTokenAndUser = require("../middlewares/verifyTokenAndUser");
const addUserInReqIfToken = require("../middlewares/addUserInReqIfToken");
const router = express.Router();




// create user

router.get("/",getAllCourses);
router.get("/:id",addUserInReqIfToken,getCourseDetailsById);
router.post("/request/:id", verifyTokenAndUser, requestCourse)





module.exports = router;