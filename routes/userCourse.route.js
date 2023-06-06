const express = require("express");
const checkCourseAccess = require("../middlewares/checkCourseAccess");
const { getCourseAcessDetailsById, getCourseIntroduction, getCourseMaterial, getQuizByTopicAndLessonId } = require("../controller/userCourse.controller");
const router = express.Router();


// BASE URL: /api/user-course


router.get("/:id", checkCourseAccess, getCourseAcessDetailsById)
router.get("/:id/introduction", checkCourseAccess, getCourseIntroduction)
router.get("/:id/material", checkCourseAccess, getCourseMaterial)
router.get("/:id/:topicId/:lessonId/quiz" ,checkCourseAccess,getQuizByTopicAndLessonId)


module.exports = router;