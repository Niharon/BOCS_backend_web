const Lessons = require("../../models/Lesson.model");

// Controller for creating a new lesson
async function createLesson(req, res) {
  try {
    const { title, course_id, topic_id, video, pdf, description } = req.body;
    const lesson = await Lessons.create({
      title,
      course_id,
      topic_id,
      video,
      pdf,
      description
    });
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller for retrieving all lessons
async function getAllLessons(req, res) {
  try {
    const lessons = await Lessons.findAll();
    res.status(200).json({ lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller for retrieving a single lesson by ID
async function getLessonById(req, res) {
  try {
    const lesson = await Lessons.findByPk(req.params.id);
    if (lesson) {
      res.status(200).json({ lesson });
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller for updating a lesson by ID
async function updateLessonById(req, res) {
  try {
    const { title, course_id, topic_id, video, pdf, description } = req.body;
    const lesson = await Lessons.findByPk(req.params.id);
    if (lesson) {
      await lesson.update({
        title: title || lesson.title,
        course_id: course_id || lesson.course_id,
        topic_id: topic_id || lesson.topic_id,
        video: video || lesson.video,
        pdf: pdf || lesson.pdf,
        description: description || lesson.description
      });
      res.status(200).json({ message: 'Lesson updated successfully', lesson });
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller for deleting a lesson by ID
async function deleteLessonById(req, res) {
  try {
    const lesson = await Lessons.findByPk(req.params.id);
    if (lesson) {
      await lesson.destroy();
      res.status(200).json({ message: 'Lesson deleted successfully' });
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById
};


