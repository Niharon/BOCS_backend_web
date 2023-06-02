const express = require("express");
const checkCourseAccess = require("../middlewares/checkCourseAccess");
const { getCourseAcessDetailsById } = require("../controller/userCourse.controller");
const router = express.Router();


// BASE URL: /api/user-course


router.get("/:id", checkCourseAccess, getCourseAcessDetailsById)
router.get("/:id/quiz" ,checkCourseAccess)


module.exports = router;