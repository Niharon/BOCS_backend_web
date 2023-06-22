const Courses = require("../../models/Course.model");
const CourseRequest = require("../../models/CourseRequest.model");
const User = require("../../models/User.model");
const UserCourse = require("../../models/UserCourse.model");
const { createNotification } = require("../usernotification.controller");

const courseRequestController = {

  async getAllCourseRequests(req, res, next) {
    try {

      // implement pagination here

      const { page = 1, limit = 10 } = req.query;

      // console.log("limit ", limit)
      const offset = (page - 1) * limit;

      const courseRequests = await CourseRequest.findAndCountAll({
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
        ],
        order: [
          ['status', 'ASC'], // Sort by status in ascending order
          ['created_at', 'DESC'], // Sort by created_at in descending order
        ],
        limit: +limit,
        offset: +offset,
      });


      res.status(200).json({
        success: true,
        count: courseRequests.count,

        courseRequests:courseRequests.rows
      })
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

      if (courseRequest.status === status) {
        return res.status(400).json({ message: 'Course request status is already updated' });
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

        // covert access end date to string
        const expiry_date = new Date(newCourse.access_end).toDateString()
        await createNotification(courseRequest.user_id, `Your course request for ${course?.title} has been confirmed. You need to complete the course within ${expiry_date}`)
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