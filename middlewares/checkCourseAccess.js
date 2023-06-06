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
                
            },
            include: [

                {
                    model: Courses,
                    as: 'course',
                    include: [
                        {
                            model: Topics,
                            as: 'topics',
                            attributes:['id','title']

                        }
                    ]
                }

            ]
        })

        if (!course) return res.json({ success: false, message: "You are not enrolled in this course" })

        // check if the course is expired or not
        // access_end: {
        //     [Op.gte]: new Date()

        // },
        // covert the date to string and then to date and compare with today's date

        // course.access_end = new Date(course.access_end)
        // console.log(course.access_end)
        // console.log(new Date(course.access_end).toISOString())
        // console.log(new Date());

        const isExpired = course.access_end < new Date();
        // console.log(isExpired)
        course.dataValues.course.isExpired = isExpired;
        req.course_access = course;
        next();

    }
    catch (err) {
        next(err)
    }


}

module.exports = checkCourseAccess;