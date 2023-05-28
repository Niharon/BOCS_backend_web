const express = require("express");
const { getAllCourses, getCourseDetailsById, requestCourse, getrequestedCourse, getUserBoughtCourse } = require("../controller/course.controller");
const addUserInReqIfToken = require("../middlewares/addUserInReqIfToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();




// course api

router.get("/",getAllCourses);
router.get("/:id",addUserInReqIfToken,getCourseDetailsById);
router.get("/requested-course", verifyToken, getrequestedCourse)
router.get("/user-course",verifyToken,getUserBoughtCourse)

router.post("/request/:id", verifyToken, requestCourse)






module.exports = router;