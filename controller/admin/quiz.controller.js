const Quizes = require("../../models/Quiz.model");

const quizController = {
    createQuiz: async (req, res, next) => {

        try {

            const quiz = await Quizes.create({ ...req.body });
            // // get the correct aswers index from quiz options and update that to quiz.correctAnswers
            const correctAnswers = [];
            req.body.options.forEach((option, index) => {
                if (option.isCorrect) {
                    correctAnswers.push(index);
                }
            });
            // console.log(correctAnswers);
            // console.log(quiz);
            quiz.correctAnswers = correctAnswers;
            await quiz.save();

 
          

            res.status(200).json({ success: true, quiz:"something", message: "Quiz created successfully" })
        } catch (error) {
            next(error)

        }

    },

    updateQuiz: async (req, res, next) => {
        try {
            const { title, numOptions, questionType, options, course_id, lesson_id } = req.body;
            const quiz = await Quizes.update({ title, numOptions, questionType, options, course_id, lesson_id }, { where: { id: req.params.id } })
            
            // update correctAnswers in Quiz 

            const quizObj = await Quizes.findByPk(req.params.id);
            // console.log(quizObj)

            // update the property correctAnswers in quizObj
            const correctAnswers = [];
            JSON.parse(quizObj.dataValues.options).forEach((option, index) => {
                if (option.isCorrect) {
                    correctAnswers.push(index);
                }
            });
            quizObj.correctAnswers = correctAnswers;
            await quizObj.save();

            
            res.status(200).json({ success: true, quizObj, message: "Quiz updated successfully" })

        } catch (error) {
            next(error)
        }
    }
}
module.exports = quizController