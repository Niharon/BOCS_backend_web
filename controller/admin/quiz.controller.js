const Quizes = require("../../models/Quiz.model");

const quizController = {
    createQuiz: async (req, res, next) => {

        try {

            const { title, numOptions, questionType, options, course_id, lesson_id } = req.body;
            const parsedOptions = JSON.parse(options);

            let questionImagePath = null;

            const optionImageIndex = [];

            req.files.forEach((file) => {
                if (file.fieldname === 'question_image') {
                    questionImagePath = "public/" + file.path.replace(/\\/g, "/").split('uploads/')[1];
                } else if (file.fieldname.startsWith('options[') && file.fieldname.endsWith('][option_image]')) {
                    optionImageIndex.push({
                        index: parseInt(file.fieldname.split('[')[1].split(']')[0]),
                        path: "public/" + file.path.replace(/\\/g, "/").split('uploads/')[1]
                    });
                }
            });

            // update option_images in options
            // optionImageIndex.forEach((optionImage) => {
            //     parsedOptions[optionImage.index].option_image = optionImage.path;
            // });
            // add option_image in each option object , if not in optionImageIndex, add as null
            const correctAnswers = [];
            parsedOptions.forEach((option, index) => {
                const optionImage = optionImageIndex.find((optionImage) => optionImage.index === index);
                if (optionImage) {
                    option.option_image = optionImage.path;
                } else {
                    option.option_image = null;
                }
                if (option.isCorrect) {
                    correctAnswers.push(index);
                }
            });


            // console.log('option_images:', optionImageIndex);
            // console.log('options:', parsedOptions);
            // console.log(Object.keys(req.files))





            // console.log(questionImagePath);
            // console.log(optionImagePaths);


            // Create the question object with the file paths

            // JSON.parse(options).forEach((option, index) => {
            //     if (option.isCorrect) {
            //         correctAnswers.push(index);
            //     }
            // });
            const question = {
                title,
                question_image: questionImagePath,
                numOptions,
                questionType,
                options: parsedOptions,
                course_id,
                lesson_id,
                correctAnswers: correctAnswers
            };

            // Create the question in the database
            const quiz = await Quizes.create(question);

            res.status(200).json({ success: true, quiz, message: "Quiz created successfully" })




            // old code
            // const quiz = await Quizes.create({ ...req.body });
            // // get the correct aswers index from quiz options and update that to quiz.correctAnswers

            // const questionImagePath = req.files['question_image'] ? req.files['question_image'][0].path : null;
            // const optionImagePaths = req.files['options[][option_image]'] ? req.files['options[][option_image]'].map(file => file.path) : [];

            // const correctAnswers = [];
            // req.body.options.forEach((option, index) => {
            //     if (option.isCorrect) {
            //         correctAnswers.push(index);
            //     }
            // });
            // // console.log(correctAnswers);
            // // console.log(quiz);
            // quiz.question_image = questionImagePath;

            // quiz.correctAnswers = correctAnswers;
            // await quiz.save();




            // res.status(200).json({ success: true, quiz: "something", message: "Quiz created successfully" })
        } catch (error) {
            next(error)

        }

    },

    updateQuiz: async (req, res, next) => {
        try {
            const { options, ...quizData } = req.body;
            const parsedOptions = JSON.parse(req.body.options);
            // console.log(req.files);


            const optionImageIndex = [];

            req.files.forEach((file) => {
                if (file.fieldname === 'question_image') {
                    quizData.question_image = "public/" + file.path.replace(/\\/g, "/").split('uploads/')[1];
                } else if (file.fieldname.startsWith('options[') && file.fieldname.endsWith('][option_image]')) {
                    optionImageIndex.push({
                        index: parseInt(file.fieldname.split('[')[1].split(']')[0]),
                        path: "public/" + file.path.replace(/\\/g, "/").split('uploads/')[1]
                    });
                }
            });

            // update option_images in options
            // optionImageIndex.forEach((optionImage) => {
            //     parsedOptions[optionImage.index].option_image = optionImage.path;
            // });

            // const correctAnswers = [];
            // parsedOptions.forEach((option, index) => {
            //     if (option.isCorrect) {
            //         correctAnswers.push(index);
            //     }
            // });

            const correctAnswers = [];
            parsedOptions.forEach((option, index) => {
                const optionImage = optionImageIndex.find((optionImage) => optionImage.index === index);
                if (optionImage) {
                    option.option_image = optionImage.path;
                } else {
                    option.option_image = null;
                }
                if (option.isCorrect) {
                    correctAnswers.push(index);
                }
            });

            quizData.correctAnswers = correctAnswers;

            // update the quiz
            const updatedQuiz = {
                ...quizData,
                options: parsedOptions

            }

            const quiz = await Quizes.update(updatedQuiz, { where: { id: req.params.id } })
            const quizObj = await Quizes.findByPk(req.params.id);

            // console.log("now")
            return res.status(200).json({ success: true, updatedQuiz: { ...quizObj.dataValues, options: JSON.parse(quizObj.dataValues.options) }, message: "Quiz updated successfully" })
            // const { title, numOptions, questionType, options, course_id, lesson_id } = req.body;
            // const quiz = await Quizes.update({ title, numOptions, questionType, options, course_id, lesson_id }, { where: { id: req.params.id } })

            // // update correctAnswers in Quiz 

            // const quizObj = await Quizes.findByPk(req.params.id);
            // // console.log(quizObj)

            // // update the property correctAnswers in quizObj
            // const correctAnswers = [];
            // JSON.parse(quizObj.dataValues.options).forEach((option, index) => {
            //     if (option.isCorrect) {
            //         correctAnswers.push(index);
            //     }
            // });
            // quizObj.correctAnswers = correctAnswers;
            // await quizObj.save();


            // res.status(200).json({ success: true, quizObj, message: "Quiz updated successfully" })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
module.exports = quizController