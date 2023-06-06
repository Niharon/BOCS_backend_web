const Courses = require("../models/Course.model")
const Lessons = require("../models/Lesson.model");
const Quizes = require("../models/Quiz.model");
const Topics = require("../models/Topic.model");
const { sequelize } = require("../sequelize");

exports.getCourseAcessDetailsById = async (req, res, next) => {

    try {

        const { course_access } = req;
        let topicLimit = course_access.course.topics.length;
        // console.log(course_access.access === "half")


        if (course_access.access === "half") {
            topicLimit = Math.ceil(topicLimit / 2)
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
                    limit: process.env.NODE_ENV === "production" && topicLimit,
                    include: [
                        {
                            model: Lessons,
                            as: 'lessons',
                            include: [
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

        course.dataValues.accessible_topics = topicLimit;
        course.dataValues.total_topics = course_access.course.topics.length
        course.dataValues.access = course_access.access;

        res.json({
            success: true,
            course: course
        })

    } catch (err) {
        next(err)
    }
}

exports.getCourseIntroduction = async (req, res, next) => {
    try {

        const { course_access } = req;
        res.json({
            success: true,
            course: course_access.course,

        })
    }
    catch (err) {
        next(err)
    }
}

exports.getCourseMaterial = async (req, res, next) => {
    try {

        const { course_access } = req;
        // console.log(course_access.course.isExpired)
        if(course_access.course.isExpired){
            
            return res.json({
                success: false,
                topics: course_access.course.topics,
                isExpired:course_access.course.isExpired
            })
        }


        let topicLimit = course_access.course.topics.length;
        // console.log(course_access.access === "half")
        if (course_access.access === "half") {
            topicLimit = Math.ceil(topicLimit / 2)
        }
        // console.log(topicLimit)


        const topics = await Topics.findAll({
            where: {
                course_id: req.params.id
            },
            include: [
                {
                    model: Lessons,
                    as: 'lessons',

                }
            ]
        })

        // remove other information from topics.lessons if access is half

        const filteredTopics = topics.map((topic,index) => {
            if(index>=topicLimit){
                return {
                    ...topic.dataValues,
                    lessons: topic.lessons.map(lesson => ({id: lesson.id, title: lesson.title})),
                    locked: true

                }
            }
            return {
                
                ...topic.dataValues,
                locked: false
            }
        })

        // course.dataValues.total_topics = topicLimit;

        res.json({
            success: true,
            topics: filteredTopics,
            expired:course_access.course.isExpired
        })
    }
    catch (err) {
        next(err)
    }
}

exports.getQuizByTopicAndLessonId = async (req, res, next) => {

    // get quiz of that course
    try{
        const {topicId,lessonId} = req.params;

        const { course_access } = req;
        if(course_access.course.isExpired){
            return res.json({
                success: false,
                message: "Course is expired, You can't access quiz"
            })
        }

        // limit the topics if access is half
        let topicLimit = course_access.course.topics.length;
        if (course_access.access === "half") {
            topicLimit = Math.ceil(topicLimit / 2)
        }
        // console.log(topicLimit)


        const topics = await Topics.findAll({
            where: {
                course_id: req.params.id
            },
            include: [
                {
                    model: Lessons,
                    as: 'lessons',

                }
            ]
        })

        // remove other information from topics.lessons if access is half
        const filteredTopics = topics.map((topic,index) => {
            if(index>=topicLimit){
                return {
                    ...topic.dataValues,
                    lessons: topic.lessons.map(lesson => ({id: lesson.id, title: lesson.title,locked:true})),
                    locked: true

                }
            }
            return {
                
                ...topic.dataValues,
                locked: false
            }
        })

        // check if the topic is locked or not
        // console.log(filteredTopics.map(topic => topic.id))
    
        const topic = filteredTopics.find(topic => topic.id == parseInt(topicId))
     
        if(topic){

            // check if the topic is locked or not
            // console.log(topic.locked)
            if(topic.locked){
                res.json({
                    success: false,
                    message: "Topic is locked"
                })
            }else{
                
                // get the quizes of that lesson
                const quizes = await Quizes.findAll({
                    where: {
                        lesson_id: lessonId,
                        course_id: req.params.id,
                        
                    },
                    attributes: ['id', 'title', 'options','questionType','numOptions']
                    
                })

                // filter the quizes and remove isCorrect from options array
                const filteredQuizes = quizes.map(quiz => {
                    return {
                        ...quiz.dataValues,
                        options: JSON.parse(quiz.options).map(option => ({id: option.id, text: option.text}))
                    }
                })


                // filter the quizes and remove
                res.json({
                    success: true,
                    quizes:filteredQuizes
                })
            

               
            }

        }else{
            res.json({
                success: false,
                message: "Topic not found"
            })
        }
        




        


    }catch(err){
        next(err)
    }

}