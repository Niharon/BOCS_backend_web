const Courses = require("../../models/Course.model");
const CourseRequest = require("../../models/CourseRequest.model");
const User = require("../../models/User.model");
const UserCourse = require("../../models/UserCourse.model");

const courseRequestController = {

  async getAllCourseRequests(req, res,next) {
    try {
      const courseRequests = await CourseRequest.findAll({
        include: [
          {
            model: Courses,
            as: 'course',
            attributes: ['id', 'title', 'price'],

          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'phone']
          }
        ]
      });
      res.json(courseRequests);
    } catch (error) {
      // console.error(error);
      next(error);
    }
  },

  async createCourseRequest(req, res) {
    const { course_id, user_id, payment_id, payment_method, payment_amount } = req.body;

    try {
      const newCourseRequest = await CourseRequest.create({
        course_id,
        user_id,
        payment_id,
        payment_method,
        payment_amount
      });

      res.json(newCourseRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getCourseReuquestDetailsById(req, res) {



    try {

      const { id } = req.params;
      const courseRequest = await CourseRequest.findByPk(id, {
        include: [
          {
            model: Courses,
            as: 'course',
            attributes: ['id', 'title', 'price'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'phone']
          }
        ]
      });

      if (!courseRequest) {
        return res.status(404).json({ message: 'Course request not found' });
      }
      res.json(courseRequest);

    }
    catch (error) {

      console.error(error);
      res.status(500).json({ message: 'Server error' });

    }
  },

  async updateCourseRequest(req, res) {


    try {

      const { id } = req.params;
      const { status } = req.body;
      const courseRequest = await CourseRequest.findByPk(id);

      if (!courseRequest) {
        return res.status(404).json({ message: 'Course request not found' });
      }

      if (status === 'confirmed') {

        courseRequest.status = status;
        courseRequest.payment_status = 'completed';

        // create a new usercourse entry
        const course = await Courses.findByPk(courseRequest.course_id);
       
        const newCourse = await UserCourse.create({
          course_id: courseRequest.course_id,
          user_id: courseRequest.user_id,
          access: courseRequest.access,
          access_start: new Date(),
          access_end: new Date(new Date().getTime() + (course.access_duration * 24 * 60 * 60 * 1000)),
          status: 'in-progress'
        });

        await newCourse.save();
      }

      else {
        courseRequest.status = status;
      }

      await courseRequest.save();



      res.json({ success: true, message: 'Course request updated successfully', courseRequest });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = courseRequestController;