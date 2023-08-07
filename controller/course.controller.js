const { Sequelize } = require("sequelize");
const Courses = require("../models/Course.model");
const CourseRequest = require("../models/CourseRequest.model");
const Lessons = require("../models/Lesson.model");
const Topics = require("../models/Topic.model");
const UserCourse = require("../models/UserCourse.model");

const getAllCourses = async (req, res, next) => {
  try {
    // limit the number of courses if limit is provided in query
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const courses = await Courses.findAll({

  

      include: [
        {
          model: Topics,
          as: "topics",
          include: [{
            model: Lessons,
            as: "lessons",
            attributes: ["id", "title"],
          }],
          attributes: ["id", "title"],
        }
      ],
      order: [["created_at", "DESC"]],
      limit,

    });
    res.json({ success: true, courses });
  } catch (err) {
    next(err)
  }
};

const getCourseDetailsById = async (req, res, next) => {
  try {

    const course = await Courses.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Topics,
          as: "topics",
          include: [{
            model: Lessons,
            as: "lessons",
            attributes: ["id", "title"],
          }],
          attributes: ["id", "title"],
        }
      ],
    });

    // check if course is enrolled by user in userCourse table
    // console.log(req.user)
    if (course) {
      course.dataValues.isEnrolled = false;
      course.dataValues.isRequested = false;
    }
    if (req.user) {

      const isEnrolled = await UserCourse.findOne({
        where: {
          user_id: req.user.id,
          course_id: req.params.id
        }
      })
      if (isEnrolled) {
        course.dataValues.isEnrolled = true;
      }
      else {
        const courseRequest = await CourseRequest.findOne({
          where: {
            user_id: req.user.id,
            course_id: req.params.id,
            status: {
              [Sequelize.Op.not]: 'cancelled'
            }

          }
        })

        if (courseRequest) {
          course.dataValues.isRequested = true;
        }
      }


    }


    res.json({ success: true, course: course });
  } catch (err) {
    next(err)
  }
}


const requestCourse = async (req, res, next) => {



  try {

    const { id } = req.params;
    const user = req.user;
    const { payment_amount, payment_method, sender_number, payment_id, access } = req.body;

    // check if user already requested this course
    const courseRequestExists = await CourseRequest.findOne({
      where: {
        user_id: user.id,
        course_id: id,
        status: {
          [Sequelize.Op.not]: 'cancelled'
        }
        
      }
    })

    if (courseRequestExists && access !== 'rest') {

      return next(new Error('You already requested this course'))
    }

    // check if the course exists in Course table
    const course = await Courses.findOne({
      where: {
        id: id
      }
    })

    if (!course) return next(new Error('Course not found'))

    if (user) {

      // If the access is rest, validate if the user has previously requested this course with half access
      if (access === 'rest') {

        const courseRequest = await CourseRequest.findOne({
          where: {
            user_id: user.id,
            course_id: id,
            access: 'half'
          }
        })

        if (!courseRequest) return next(new Error('You must Have previous Half Access to request for Rest Access'))
      }


      const courseRequest = await CourseRequest.create({
        user_id: user.id,
        course_id: id,
        status: 'pending',
        access: access,
        payment_id: payment_id,
        payment_status: 'pending',
        payment_method: payment_method,
        payment_amount: payment_amount,
        sender_number: sender_number

      })

      res.json({
        success: true,
        message: "Course request created successfully",
        courseRequest,
      });
    }
    else {
      next(new Error('User not found'))
    }


  } catch (err) {
    next(err)
  }

}


const getrequestedCourse = async (req, res, next) => {

  try {

    const user = req.user;
    // console.log(user)
    if (user) {

      const courseRequest = await CourseRequest.findAll({
        where: {
          user_id: user.id,
        },
        include: [
          {
            model: Courses,

          }
        ],
      })

      res.json({
        success: true,
        data: courseRequest,
      });
    }
    else {
      next(new Error('User not found'))
    }

  } catch (err) {
    next(err)
  }

}


const getUserBoughtCourse = async (req, res, next) => {

  try {

    const user = req.user;

    if (user) {

      const userCourses = await UserCourse.findAll({
        where: {
          user_id: user.id,
        },
        include: [
          {
            model: Courses,

          }
        ],
      })

      // add isExpired property to userCourses by checking the access_end with today's date
      userCourses.forEach(course => {
        if (new Date(course.access_end) < new Date()) {
          course.dataValues.isExpired = true;
        }
        else {
          course.dataValues.isExpired = false;
        }
      })
      

      res.json({
        success: true,
        data: userCourses,
      });
    }
    else {
      next(new Error('User not found'))
    }

  } catch (err) {
    next(err)
  }

}
module.exports = {
  getAllCourses,
  getCourseDetailsById,
  requestCourse,
  getrequestedCourse,
  getUserBoughtCourse
};