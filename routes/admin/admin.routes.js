const express = require("express");
const path = require('path');

// import the controller
const courseController = require("../../controller/admin/course.controller");
const lessonController = require("../../controller/admin/lesson.controller");
const courseRequestController = require("../../controller/admin/courseRequestController");
const topicsController = require("../../controller/admin/topic.controller");
const userCourseController = require('../../controller/userCourse.controller');
const quizController = require("../../controller/admin/quiz.controller");
const multer = require("multer");
const verifyPrevToken = require("../../middlewares/verifyPrevToken");


const router = express.Router();
// multer

// upload dir to public_html of cpanel in multer using path module


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/public_html/uploads/courses/thumbnail");
    },
    filename: function (req, file, cb) {
    
        const extension = path.extname(file.originalname);
        
        // slugify the name
        let sluggedName = "course-thumbnail";
        if(req.body.title){

            sluggedName = req.body.title.split(" ").join("-").toLowerCase();
        }



      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, sluggedName + "-" + uniqueSuffix+extension);
    },
  });
const upload = multer({ storage: storage })


// verifytoken

router.post("/verifyToken",verifyPrevToken)

//course
router.get("/courses", courseController.getAllCourse);
router.get("/course/:id", courseController.getCourseDetailsByID);
router.post("/course",upload.single('course_thumbnail'), courseController.create);
router.patch("/course/:id",upload.single('course_thumbnail'), courseController.update);
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
router.patch('/quiz/:id',quizController.updateQuiz);


//course-requests
router.get('/course-request/all-course-requests', courseRequestController.getAllCourseRequests);
router.post('/course-request/create', courseRequestController.createCourseRequest);
router.patch('/course-request/:id', courseRequestController.updateCourseRequest);


// UserCourse
// router.post('/user-course/create', userCourseController.createUserCourse);
// router.get('/user-course/:id', userCourseController.getUserCourse);
// router.patch('/user-course/:id', userCourseController.updateUserCourse);
// router.delete('/user-course/:id', userCourseController.deleteUserCourse);


module.exports = router;







