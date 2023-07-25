const Courses = require("../models/Course.model");
const User = require("../models/User.model");
const UserCourse = require("../models/UserCourse.model");

exports.verifyCourse = async (req, res, next) => {
    try {

        const { id } = req.params;

        const courseData = await UserCourse.findOne({
            where: {
                id: id,
                progress:100
            },
            include: [
                {
                    model: Courses,
                    as: 'course',
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id','name', 'email']
                }
            ]
        })
        if(!courseData){
            return res.redirect('/')
        }
        // Render the EJS template and pass the data as an object
        // return res.send(courseData)
        res.render('verify', {courseData:courseData,date: new Date(courseData.updated_at).toDateString()});
    }
    catch (e) {
        next(e)
    }
}

