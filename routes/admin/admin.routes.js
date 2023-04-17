const express = require("express");
const router = express.Router();

// import the controller
const courseController = require("../../controller/admin/course.controller");
const lessonController = require("../../controller/admin/lesson.controller");

router.post("/course/create", courseController.create);
router.patch("/course/:id", courseController.update);
router.delete("/course/:id", courseController.delete);

//lesson
router.post('/lesson/create', lessonController.createLesson);
router.get('/lesson/total-lessions', lessonController.getAllLessons);
router.get('/lesson/:id', lessonController.getLessonById);
router.put('/lesson/:id', lessonController.updateLessonById);
router.delete('/lesson/:id', lessonController.deleteLessonById);

module.exports = router;







