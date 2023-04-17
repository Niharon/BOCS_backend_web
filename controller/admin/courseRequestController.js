const CourseRequest = require("../../models/CourseRequest.model");

const courseRequestController = {
  async getAllCourseRequests(req, res) {
    try {
      const courseRequests = await CourseRequest.findAll();
      res.json(courseRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
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

  async updateCourseRequest(req, res) {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    try {
      const courseRequest = await CourseRequest.findByPk(id);

      if (!courseRequest) {
        return res.status(404).json({ message: 'Course request not found' });
      }

      courseRequest.status = status || courseRequest.status;
      courseRequest.payment_status = payment_status || courseRequest.payment_status;

      await courseRequest.save();

      res.json(courseRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = courseRequestController;
