const express = require("express");
const path = require('path');

// import the controller
const adminCourseController = require("../../controller/admin/admincourse.controller");
const lessonController = require("../../controller/admin/lesson.controller");
const courseRequestController = require("../../controller/admin/courseRequestController");
const topicsController = require("../../controller/admin/topic.controller");
const quizController = require("../../controller/admin/quiz.controller");
const verifyPrevToken = require("../../middlewares/verifyPrevToken");
const instructorController = require("../../controller/admin/instructor.controller");
const { courseThumbnailUpload, instructorPhotoUpload, lessonPdfUpload, quizImageUpload } = require("../../middlewares/multerConfig");
const User = require("../../models/User.model");
const { getAllUsers, getUserById, updateUser } = require("../../controller/user.controller");
const { getGeneralSettings, updateGeneralSettings } = require("../../controller/admin/generalSettings.controller");

// verifytoken
const router = express.Router();

router.post("/verifyToken",verifyPrevToken)

router.use("/app", require("../appsettings.routes"));

// All users API
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById)
router.patch("/users/:id", updateUser)

 
//course
router.get("/courses", adminCourseController.getAllCourse);
router.get("/course/:id", adminCourseController.getCourseDetailsByID);
router.post("/course",courseThumbnailUpload.single('course_thumbnail'), adminCourseController.create);
router.patch("/course/:id",courseThumbnailUpload.single('course_thumbnail'), adminCourseController.update);
router.delete("/course/:id", adminCourseController.delete);


//topics
router.get('/topics', topicsController.getAllTopics);
router.get('/topics/:id', topicsController.getTopicById);
router.post('/topic', topicsController.createTopic);
router.post('/topics', topicsController.createBulkTopic);
router.patch('/topic/:id', topicsController.updateTopicById);
router.delete('/topic/:id', topicsController.deleteTopicById);

//lesson
router.post('/lesson',lessonPdfUpload.single('pdf'), lessonController.createLesson);
router.get('/lesson/total-lessions', lessonController.getAllLessons);
router.get('/lesson/:id', lessonController.getLessonById);
router.patch('/lesson/:id',lessonPdfUpload.single('pdf'), lessonController.updateLessonById);
router.delete('/lesson/:id', lessonController.deleteLessonById);



//quizes
router.post('/quiz', quizImageUpload.any(),quizController.createQuiz);
router.patch('/quiz/:id',quizImageUpload.any(),quizController.updateQuiz);


//course-requests
router.get('/course-requests', courseRequestController.getAllCourseRequests);
router.get('/course-requests/:id', courseRequestController.getCourseReuquestDetailsById);
router.patch('/course-requests/:id', courseRequestController.updateCourseRequest);


// UserCourse
// router.post('/user-course/create', userCourseController.createUserCourse);
// router.get('/user-course/:id', userCourseController.getUserCourse);
// router.patch('/user-course/:id', userCourseController.updateUserCourse);
// router.delete('/user-course/:id', userCourseController.deleteUserCourse);


// instructors
router.get('/instructors', instructorController.getAllInstructors);
router.get('/instructors/:id', instructorController.getInstructorById);
router.post('/instructors/',instructorPhotoUpload.single("photo"), instructorController.createInstructor);
router.patch('/instructors/:id',instructorPhotoUpload.single("photo"), instructorController.updateInstructor);
router.delete('/instructors/:id', instructorController.deleteInstructor);



// general settings
router.get('/general-settings', getGeneralSettings);
router.get('/update-settings/:id', updateGeneralSettings);
module.exports = router;






