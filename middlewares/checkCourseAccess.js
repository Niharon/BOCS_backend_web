const Courses = require("../models/Course.model");
const Topics = require("../models/Topic.model");
const UserCourse = require("../models/UserCourse.model");
const { Op } = require("sequelize");

const checkCourseAccess = async (req, res, next) => {

    try {
        const user = req.user;
        const courseId = req.params.id;
        // console.log(user.id, courseId)
        const course = await UserCourse.findOne({
            where: {
                user_id: user.id,
                course_id: courseId,
                access_end: {
                    [Op.gte]: new Date()

                },
            },
            include: [

                {
                    model: Courses,
                    as: 'course',
                    include: [
                        {
                            model: Topics,
                            as: 'topics',

                        }
                    ]
                }

            ]
        })

        if (!course) return res.json({ success: false, message: "You are not enrolled in this course" })

        req.course_access = course;
        next();

    }
    catch (err) {
        next(err)
    }


}

module.exports = checkCourseAccess;