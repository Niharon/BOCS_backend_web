const Courses = require("../models/Course.model");
const CourseRequest = require("../models/CourseRequest.model");
const Lessons = require("../models/Lesson.model");
const Topics = require("../models/Topic.model");
const UserCourse = require("../models/UserCourse.model");

const getAllCourses = async (req, res,next) => {
  try {
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
      
    });
    res.json(courses);
  } catch (err) {
    next(err)
  }
};

const getCourseDetailsById = async (req, res,next) => {
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
    if(req.user){

      const isEnrolled = await UserCourse.findOne({
        where: {
          user_id: req.user.id,
          course_id: req.params.id
        }
      })
      if(isEnrolled){
        course.dataValues.isEnrolled = true;
      }
      else{
        const courseRequest = await CourseRequest.findOne({
          where: {
            user_id: req.user.id,
            course_id: req.params.id
          
          }
        })
  
        if(courseRequest){
          course.dataValues.isRequested = true;
        }
      }

      
    }
    

    res.json(course);
  } catch (err) {
    next(err)
  }
}


const requestCourse = async (req, res, next) => {



  try{

    const {id} = req.params;
    const user = req.user;
    const {payment_amount,payment_method,sender_number,payment_id,access} = req.body;

    // check if user already requested this course
    const courseRequestExists = await CourseRequest.findOne({
      where: {
        user_id: user.id,
        course_id: id
      }
    })

    if(courseRequestExists){
    
      return next(new Error('You already requested this course'))
    }


    if(user){



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
    else{
      next(new Error('User not found'))
    }


  }catch(err){
    next(err)
  }

}


const getrequestedCourse = async (req, res, next) => {
  
    try{
  
      const user = req.user;
  
      if(user){
  
        const courseRequest = await CourseRequest.findAll({
          where: {
            user_id: user.id,
          }
        })
  
        res.json({
          success: true,
          data:courseRequest,
        });
      }
      else{
        next(new Error('User not found'))
      }

    }catch(err){  
      next(err)
    }

}


const getUserBoughtCourse = async (req, res, next) => {

  try{

    const user = req.user;

    if(user){

      const userCourses = await UserCourse.findAll({
        where: {
          user_id: user.id,
        }
      })

      res.json({
        success: true,
        data:userCourses,
      });
    }
    else{
      next(new Error('User not found'))
    }

  }catch(err){  
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
