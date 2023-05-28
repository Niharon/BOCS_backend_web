const express = require("express");
const { getAllCourses, getCourseDetailsById, requestCourse, getrequestedCourse, getUserBoughtCourse } = require("../controller/course.controller");
const addUserInReqIfToken = require("../middlewares/addUserInReqIfToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();




// course api
// base url: /api/courses

router.get("/",getAllCourses);
router.get("/requested-course", verifyToken, getrequestedCourse)
router.get("/user-course",verifyToken,getUserBoughtCourse)

router.post("/request/:id", verifyToken, requestCourse)

// it should be in last always
router.get("/:id",addUserInReqIfToken,getCourseDetailsById);






module.exports = router;