const Lessons = require("../models/Lesson.model");
const Topics = require("../models/Topic.model");

const checkHalfOrFullAccess = async (req, res, next) => {

    const { course_access } = req;
    const { topicId } = req.params;
    // console.log(course_access.course.isExpired)


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

    const filteredTopics = topics.map((topic, index) => {
        if (index >= topicLimit) {
            return {
                ...topic.dataValues,
                lessons: topic.lessons.map(lesson => ({ id: lesson.id, title: lesson.title })),
                locked: true

            }
        }
        return {

            ...topic.dataValues,
            locked: false
        }
    })

    if (topicId) {
        const topic = filteredTopics.find(topic => topic.id == parseInt(topicId))
        if (topic) {
            if (topic.locked) {
                return res.status(403).json({
                    success: false,
                    message: "Topic is Locked, Access Full Course to get Access to this topic"
                })
            }
            req.filteredTopics = filteredTopics;
            next();

        }
        else {
            return res.status(404).json({
                success: false,
                message: "Topic not Found"
            })
        }
    }
    else {

        req.filteredTopics = filteredTopics;
        next();

    }



}

module.exports = checkHalfOrFullAccess;