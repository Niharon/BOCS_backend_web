const Discussion = require("../models/Discussion.model");
const DiscussionAnswer = require("../models/DiscussionAnswer.model");
const User = require("../models/User.model");

exports.createDiscussionQuestion = async (req, res, next) => {
    try {
        const { question } = req.body;
        const { id } = req.params;
        const discussion = await Discussion.create({
            question,
            course_id: id,
            user_id: req.user.id
        });
        res.status(200).json({
            success: true,
            message: "Question created successfully",
            discussion
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllDiscussionByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const discussions = await Discussion.findAll({
            where: {
                course_id: id,
            },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        });
        res.status(200).json({
            success: true,
            discussions
        })
    } catch (error) {
        next(error)
    }
}

// post answer to a discussion question
exports.postAnswer = async (req, res, next) => {

    try {

        const { discussionId } = req.params;
        const { answer } = req.body;
        const discussion = await Discussion.findByPk(discussionId);
        if (!discussion) return res.status(404).json({ success: false, message: "Discussion not found" })
        const discussion_answer = await DiscussionAnswer.create({
            discussion_id: discussionId,
            user_id: req.user.id,
            answer: answer
        })
        res.status(200).json({
            success: true,
            message: "Answer posted successfully",
            discussion_answer
        })


    }
    catch (e) {
        next(e)
    }
}

exports.getDiscussionDetailsById = async (req, res, next) => {
    try {
        const { discussionId } = req.params;

        const discussion = await Discussion.findOne({
            where: {
                id: discussionId
            },
            include: [
                {
                    model: DiscussionAnswer,
                    as: "answers",
                    include: {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"]
                    }

                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            ],

        })

        if (!discussion) return res.status(404).json({ success: false, message: "Discussion not found" })

        res.status(200).json({
            success: true,
            discussion
        })


    } catch (e) {
        next(e)
    }
}