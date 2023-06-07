const express = require("express");
const checkCourseAccess = require("../middlewares/checkCourseAccess");
const { getCourseAcessDetailsById, getCourseIntroduction, getCourseMaterial, getQuizByTopicAndLessonId, submitQuiz, setQuizCorrectAnswers, checkCompletedLessonUpdate, getLessonAccessById } = require("../controller/userCourse.controller");
const checkCourseExpiry = require("../middlewares/checkCourseExpiry");
const checkHalfOrFullAccess = require("../middlewares/checkHalfOrFullAccess");
const router = express.Router();


// BASE URL: /api/user-course


router.get("/:id", checkCourseAccess, getCourseAcessDetailsById)
router.get("/:id/introduction", checkCourseAccess, getCourseIntroduction)
router.get("/:id/material", checkCourseAccess,checkCourseExpiry,checkHalfOrFullAccess, getCourseMaterial)
router.get("/:id/:topicId/:lessonId/lesson" ,checkCourseAccess,checkCourseExpiry,getLessonAccessById)
router.get("/:id/:topicId/:lessonId/quiz" ,checkCourseAccess,checkCourseExpiry,checkHalfOrFullAccess,getQuizByTopicAndLessonId)
router.post("/:id/:topicId/:lessonId/submit-quiz" ,checkCourseAccess,checkCourseExpiry,submitQuiz)
router.post("/:id/:topicId/:lessonId/test" ,checkCourseAccess,checkCourseExpiry,checkCompletedLessonUpdate)



module.exports = router;