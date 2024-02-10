const { Sequelize } = require("sequelize");
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

        courseRequests: courseRequests.rows
      })
    } catch (error) {
      // console.error(error);
      next(error);
    }
  },

  async createCourseRequest(req, res, next) {
    const { course_id, email, payment_amount, payment_method, sender_number, payment_id, access, contact_no,status , payment_status} = req.body;

    try {

      // const { id } = req.params;
      // get the user by email or thorugh error if not found
      
      const user = await User.findOne({
        where: {
          email: email
        }
      })


      if (!user) return next(new Error('User not found'))
 

      // check if user already requested this course
      const courseRequestExists = await CourseRequest.findOne({
        where: {
          user_id: user.id,
          course_id: course_id,
          status: {
            [Sequelize.Op.not]: 'cancelled'
          }

        }
      })

      if (courseRequestExists && access !== 'rest') {

        return next(new Error('This user already requested this course. You can not request the same course again.'))
      }

      // check if the course exists in Course table
      const course = await Courses.findOne({
        where: {
          id: course_id
        }
      })

      if (!course) return next(new Error('Course not found'))

      if (user) {

        // If the access is rest, validate if the user has previously requested this course with half access
        if (access === 'rest') {

          const courseRequest = await CourseRequest.findOne({
            where: {
              user_id: user.id,
              course_id: course_id,
              access: 'half'
            }
          })

          if (!courseRequest) return next(new Error('You must Have previous Half Access to request for Rest Access'))
        }


        const courseRequest = await CourseRequest.create({
          user_id: user.id,
          course_id: course_id,
          status: status,
          access: access,
          payment_id: payment_id,
          payment_status: payment_status,
          payment_method: payment_method,
          payment_amount: payment_amount,
          sender_number: sender_number,
          contact_no: contact_no

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

        // if courseRequest access is rest update the UserCourse access to full
        if (courseRequest.access === 'rest') {
          const userCourse = await UserCourse.findOne({
            where: {
              user_id: courseRequest.user_id,
              course_id: courseRequest.course_id
            }
          });
          userCourse.access = 'full';
          await userCourse.save();
          await createNotification(courseRequest.user_id, `Your Rest course request for ${course?.title} has been confirmed`);
        }
        else {


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
          await createNotification(courseRequest.user_id, `Your course request for ${course?.title} has been confirmed. You need to complete the course within ${expiry_date}`);
        }


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