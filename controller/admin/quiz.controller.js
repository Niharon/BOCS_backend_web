const Quizes = require("../../models/Quiz.model");

const quizController = {
    createQuiz : async (req, res,next) => {

        try {
       
            const quiz = await Quizes.create({...req.body});

            res.status(200).json({success:true,quiz,message:"Quiz created successfully"})
        } catch (error) {
            next(error)
            
        }

    }
}
module.exports= quizController