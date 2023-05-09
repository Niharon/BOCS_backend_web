const express = require("express");
const router = express.Router();

// import the controller
const courseController = require("../../controller/admin/course.controller");
const lessonController = require("../../controller/admin/lesson.controller");
const courseRequestController = require("../../controller/admin/courseRequestController");
const topicsController = require("../../controller/admin/topic.controller");
const userCourseController = require('../../controller/userCourse.controller');
const quizController = require("../../controller/admin/quiz.controller");


//course
router.get("/courses", courseController.getAllCourse);
router.get("/course/:id", courseController.getCourseDetailsByID);
router.post("/course", courseController.create);
router.patch("/course/:id", courseController.update);
router.delete("/course/:id", courseController.delete);


//topics
router.get('/topics', topicsController.getAllTopics);
router.get('/topics/:id', topicsController.getTopicById);
router.post('/topic', topicsController.createTopic);
router.post('/topics', topicsController.createBulkTopic);
router.patch('/topic/:id', topicsController.updateTopicById);
router.delete('/topic/:id', topicsController.deleteTopicById);

//lesson
router.post('/lesson', lessonController.createLesson);
router.get('/lesson/total-lessions', lessonController.getAllLessons);
router.get('/lesson/:id', lessonController.getLessonById);
router.patch('/lesson/:id', lessonController.updateLessonById);
router.delete('/lesson/:id', lessonController.deleteLessonById);

//quizes
router.post('/quiz',quizController.createQuiz);


//course-requests
router.get('/course-request/all-course-requests', courseRequestController.getAllCourseRequests);
router.post('/course-request/create', courseRequestController.createCourseRequest);
router.patch('/course-request/:id', courseRequestController.updateCourseRequest);


// UserCourse
router.post('/user-course/create', userCourseController.createUserCourse);
router.get('/user-course/:id', userCourseController.getUserCourse);
router.patch('/user-course/:id', userCourseController.updateUserCourse);
router.delete('/user-course/:id', userCourseController.deleteUserCourse);


module.exports = router;







