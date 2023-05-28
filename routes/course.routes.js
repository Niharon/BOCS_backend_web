const express = require("express");
const { getAllCourses, getCourseDetailsById, requestCourse } = require("../controller/userCourse.controller");
const addUserInReqIfToken = require("../middlewares/addUserInReqIfToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();




// course api

router.get("/",getAllCourses);
router.get("/:id",addUserInReqIfToken,getCourseDetailsById);
router.post("/request/:id", verifyToken, requestCourse)





module.exports = router;