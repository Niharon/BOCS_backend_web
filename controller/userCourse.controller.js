const  UserCourse  = require("../models/UserCourse.model");

const createUserCourse = async (req, res) => {
  try {
    const { course_id, user_id, progress, status, access, access_start, access_end } = req.body;
    const userCourse = await UserCourse.create({ 
      course_id,
      user_id,
      progress,
      status,
      access,
      access_start,
      access_end
    });
    res.status(201).json({ userCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userCourse = await UserCourse.findByPk(id);
    if (userCourse) {
      res.status(200).json({ userCourse });
    } else {
      res.status(404).json({ error: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, status, access } = req.body;
    const [updated] = await UserCourse.update(
      { progress, status, access },
      { where: { id: id } }
    );
    if (updated) {
      const updatedUserCourse = await UserCourse.findByPk(id);
      res.status(200).json({ message: "UserCourse Updated" });
    } else {
      res.status(404).json({ error: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserCourse.destroy({ where: { id: id } });
    if (deleted) {
      res.status(204).send('UserCourse deleted');
    } else {
      res.status(404).json({ error: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserCourse,
  getUserCourse,
  updateUserCourse,
  deleteUserCourse
};
