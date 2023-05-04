const express = require("express");
const router = express.Router();

// import the controller
const courseController = require("../../controller/admin/course.controller");
const lessonController = require("../../controller/admin/lesson.controller");
const courseRequestController = require("../../controller/admin/courseRequestController");
const topicsController = require("../../controller/admin/topic.controller");
const userCourseController = require('../../controller/userCourse.controller');


//course
router.get("/course/:id", courseController.getCourseDetailsByID);
router.post("/course/create", courseController.create);
router.patch("/course/:id", courseController.update);
router.delete("/course/:id", courseController.delete);

//lesson
router.post('/lesson/create', lessonController.createLesson);
router.get('/lesson/total-lessions', lessonController.getAllLessons);
router.get('/lesson/:id', lessonController.getLessonById);
router.patch('/lesson/:id', lessonController.updateLessonById);
router.delete('/lesson/:id', lessonController.deleteLessonById);


//course-requests
router.get('/course-request/all-course-requests', courseRequestController.getAllCourseRequests);
router.post('/course-request/create', courseRequestController.createCourseRequest);
router.patch('/course-request/:id', courseRequestController.updateCourseRequest);


//topics
router.get('/topics', topicsController.getAllTopics);
router.get('/topics/:id', topicsController.getTopicById);
router.post('/topics', topicsController.createTopic);
router.patch('/topics/:id', topicsController.updateTopicById);
router.delete('/topics/:id', topicsController.deleteTopicById);


// UserCourse
router.post('/user-course/create', userCourseController.createUserCourse);
router.get('/user-course/:id', userCourseController.getUserCourse);
router.patch('/user-course/:id', userCourseController.updateUserCourse);
router.delete('/user-course/:id', userCourseController.deleteUserCourse);


module.exports = router;







