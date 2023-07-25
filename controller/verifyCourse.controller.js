const Courses = require("../models/Course.model");
const User = require("../models/User.model");
const UserCourse = require("../models/UserCourse.model");

exports.verifyCourse = async (req, res, next) => {
    try {

        const { id } = req.params;
        let found = true;
        const courseData = await UserCourse.findOne({
            where: {
                id: id,

            },
            include: [
                {
                    model: Courses,
                    as: 'course',
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        })
        if (!courseData || courseData.progress != 100) {
            found = false;
        }
        // Render the EJS template and pass the data as an object
        // return res.send(courseData)

        res.render('verify', { courseData: courseData, date: new Date(courseData?.updated_at).toDateString(), found: found });
    }
    catch (e) {
        next(e)
    }
}

