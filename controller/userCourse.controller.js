const Courses = require("../models/Course.model")
const Lessons = require("../models/Lesson.model");
const Quizes = require("../models/Quiz.model");
const Topics = require("../models/Topic.model")

exports.getCourseAcessDetailsById = async (req, res, next) => {
    try{

        const {course_access} = req;
        let topicLimit = course_access.course.topics.length;
        // console.log(course_access.access === "half")


        if(course_access.access === "half"){
            topicLimit = Math.ceil(topicLimit/2)
        }
        // console.log(topicLimit)
      

        const course = await Courses.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Topics,
                    as: 'topics',
                    limit: topicLimit,
                    include:[
                        {
                            model: Lessons,
                            as: 'lessons',
                            include:[
                                {
                                    model: Quizes,
                                    as: 'quizes'
                                }
                            ]
                        }
                    ]
                }

            ]
        })

        course.dataValues.total_topics = topicLimit;

        res.json({
            success: true,
            course:course
        })

    }catch(err){
        next(err)
    }
}