const Lessons = require("../../models/Lesson.model");

// Controller for creating a new lesson
async function createLesson(req, res) {
  try {
    const { title, course_id, topic_id, video, description, order } = req.body;
    // check if there is any file in req.file or not if there then assign it to pdf
    // console.log("file from controller ",req.file)
    let pdf = req.file ? req.file.filename : null;
    const lesson = await Lessons.create({
      title,
      course_id,
      topic_id,
      video,
      pdf,
      description,
      order
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
async function getLessonById(req, res, next) {
  try {
    const lesson = await Lessons.findByPk(req.params.id, {
      include: "quizes",

    });

    if (lesson) {
      let data = lesson.toJSON();
      if (data.quizes.length > 0) {
        for (let i = 0; i < data.quizes.length; i++) {
          data.quizes[i].options = JSON.parse(data.quizes[i].options)
        }
      }
      // console.log(data)
      // const parsedLesson = {...data,quizes:JSON.parse(data.quizes)}
      res.status(200).json({ success: true, lesson: data, message: 'Lesson retrieved successfully' });
    } else {
      next(new Error("Lesson not found"))
    }
  } catch (error) {
    next(error);
  }
}

// Controller for updating a lesson by ID
async function updateLessonById(req, res) {
  try {

    const lesson = await Lessons.findByPk(req.params.id);
    if (req.file) {
      req.body.pdf = req.file.filename
    }
    if (lesson) {
      await lesson.update({
        ...req.body
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

// update order of the lessons in the object according to the lesson id

async function updateLessonOrder(req,res,next){
  try{

    // const {lessonOrder} = req.body;
    // console.log(lessonOrder)
    // lessonOrder = {
    //   lessonId:order,
    //   lessonId:order,
    // }
    // console.log(lessonOrder)
    const lessonUpdates = Object.entries(req.body).map(([lessonId, newOrder]) => ({
      id: lessonId,
      order: newOrder,
    }));
    await Lessons.bulkCreate(lessonUpdates, { updateOnDuplicate: ['order'] });


    res.status(200).json({message:"Lesson order updated successfully"})


  }
  catch(error){
    next(error)
  }
}

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById,
  updateLessonOrder
};


