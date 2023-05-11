const Quizes = require("../../models/Quiz.model");

const quizController = {
    createQuiz : async (req, res,next) => {

        try {
       
            const quiz = await Quizes.create({...req.body});

            res.status(200).json({success:true,quiz,message:"Quiz created successfully"})
        } catch (error) {
            next(error)
            
        }

    },

    updateQuiz: async (req, res,next) => {
        try{
            const {title,numOptions,questionType,options,course_id,lesson_id} = req.body;
            const quiz = await Quizes.update({title,numOptions,questionType,options,course_id,lesson_id},{where:{id:req.params.id}})
            res.status(200).json({success:true,quiz,message:"Quiz updated successfully"})

        }catch(error){
            next(error)
        }
    }
}
module.exports= quizController