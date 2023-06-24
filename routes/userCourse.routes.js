const express = require("express");
const checkCourseAccess = require("../middlewares/checkCourseAccess");
const { getCourseAcessDetailsById, getCourseIntroduction, getCourseMaterial, getQuizByTopicAndLessonId, submitQuiz, setQuizCorrectAnswers, checkCompletedLessonUpdate, getLessonAccessById, getQuizAttemptDetails } = require("../controller/userCourse.controller");
const checkCourseExpiry = require("../middlewares/checkCourseExpiry");
const checkHalfOrFullAccess = require("../middlewares/checkHalfOrFullAccess");
const { createDiscussionQuestion, getAllDiscussionByCourseId, postAnswer, getDiscussionDetailsById } = require("../controller/discussion.controller");
const router = express.Router();


// BASE URL: /api/user-course


router.get("/:id", checkCourseAccess, getCourseAcessDetailsById)
router.get("/:id/introduction", checkCourseAccess, getCourseIntroduction)
router.get("/:id/material", checkCourseAccess, checkCourseExpiry, checkHalfOrFullAccess, getCourseMaterial)

// discussion routes
router.post("/:id/discussion", checkCourseAccess, createDiscussionQuestion);
router.get("/:id/discussion", checkCourseAccess, getAllDiscussionByCourseId)
router.post("/:id/:discussionId/discussion", checkCourseAccess, postAnswer)
router.get("/:id/:discussionId/discussion", checkCourseAccess, getDiscussionDetailsById)

router.get("/:id/:topicId/:lessonId/lesson", checkCourseAccess, checkCourseExpiry, getLessonAccessById)
router.get("/:id/:topicId/:lessonId/quiz", checkCourseAccess, checkCourseExpiry, checkHalfOrFullAccess, getQuizByTopicAndLessonId)
router.post("/:id/:topicId/:lessonId/submit-quiz", checkCourseAccess, checkCourseExpiry, checkHalfOrFullAccess, submitQuiz)
router.get("/:id/:topicId/:lessonId/quiz/result", checkCourseAccess, checkCourseExpiry, checkHalfOrFullAccess, getQuizAttemptDetails)
router.post("/:id/:topicId/:lessonId/test", checkCourseAccess, checkCourseExpiry, checkCompletedLessonUpdate)



module.exports = router;