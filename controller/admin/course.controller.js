const Courses = require("../../models/Course.model");
const Lessons = require("../../models/Lesson.model");
const Topics = require("../../models/Topic.model");

const courseController = {
  getAllCourse: async (req, res, next) => {
    try {
      const courses = await Courses.findAll({
        include: [
          {
            model: Topics,
            as: "topics",
            include: ["lessons"],
          },
          {
            model: Lessons,
            as: "lessons",

          },
        ],
        order: [["created_at", "DESC"]],
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Courses fetched successfully",
          courses,
        });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getCourseDetailsByID: async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Courses.findOne({
        where: { id },
        include: [
          {
            model: Topics,
            as: "topics",
            include: ["lessons"],
          },
          {
            model: Lessons,
            as: "lessons",
          
          },
        
        ],
      });
      if (course) {
        res
          .status(200)
          .json({
            success: true,
            message: "Course fetched successfully",
            course,
          });
      } else {
        res.status(400).json({ success: false, message: "Course not found" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  create: async (req, res, next) => {
    
    try {
      const course = await Courses.create({

        ...req.body,course_thumbnail:req.file.fileName

      });
      res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res, next) => {
    // console.log(req.body)
    // update api for course
    // console.log(req.file.path)
    const { id } = req.params;
    try {
      // const [course] = await Courses.update(
      //   { ...req.body },
      //   {
      //     where: {
      //       id,
      //     },
      //   }
      // );
      const course = await Courses.findByPk(id);

      // If the course doesn't exist, return a 404 response
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      if(req.file){
        req.body.course_thumbnail = req.file.fileName;
      }
      await course.update(req.body);


      if (course) {
        const updatedCourse = await Courses.findOne({ where: { id } });
        return res
          .status(200)
          .json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
          });
      } else {
        return res.status(400).json({ message: "Could not Update Course" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Courses.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Course deleted successfully",
          course,
        });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = courseController;
