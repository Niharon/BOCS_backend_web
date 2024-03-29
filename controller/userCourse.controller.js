const Courses = require("../models/Course.model")
const Lessons = require("../models/Lesson.model");
const Quizes = require("../models/Quiz.model");
const Topics = require("../models/Topic.model");
const UserCourse = require("../models/UserCourse.model");
const UserQuizAttempt = require("../models/UserQuizAttempt.model");
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
            expired: course_access.course.isExpired

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


        // let topicLimit = course_access.course.topics.length;
        // // console.log(course_access.access === "half")
        // if (course_access.access === "half") {
        //     topicLimit = Math.ceil(topicLimit / 2)
        // }
        // // console.log(topicLimit)


        // const topics = await Topics.findAll({
        //     where: {
        //         course_id: req.params.id
        //     },
        //     include: [
        //         {
        //             model: Lessons,
        //             as: 'lessons',

        //         }
        //     ]
        // })

        // // remove other information from topics.lessons if access is half

        // const filteredTopics = topics.map((topic, index) => {
        //     if (index >= topicLimit) {
        //         return {
        //             ...topic.dataValues,
        //             lessons: topic.lessons.map(lesson => ({ id: lesson.id, title: lesson.title })),
        //             locked: true

        //         }
        //     }
        //     return {

        //         ...topic.dataValues,
        //         locked: false
        //     }
        // })
        


        const filteredTopics = req.filteredTopics

        // filteredTopics.map(topic => {
        //     topic.lessons.map(lesson => {
        //         console.log(lesson)
        //     })
        // })


        // course.dataValues.total_topics = topicLimit;

        res.json({
            success: true,
            access: req.course_access.access,
            topics: filteredTopics,
            expired: course_access.course.isExpired
        })
    }
    catch (err) {
        next(err)
    }
}


exports.getLessonAccessById = async (req, res, next) => {

    try {

        const { id: course_id, topicId, lessonId } = req.params;

        const lesson = await Lessons.findOne({
            where: {
                id: lessonId,
                course_id: course_id,

            },
            include: {
                model: Quizes,
                as: 'quizes',
                attributes: ['id', 'title']
            }
        })
        if (!lesson) {
            return res.json({
                success: false,
                message: "Lesson not found"
            })
        }
        const userCourse = await UserCourse.findOne({
            where: {
                user_id: req.user.id,
                course_id: course_id
            }
        })
        // check if the lesson.id is in the userCourse.completed_lessons or not
        const isCompleted = userCourse.completed_lessons?.includes(lesson.id) ? true : false;
        if (isCompleted) {
            lesson.dataValues.completed = true;
        }
        else {
            lesson.dataValues.completed = false;
        }
        res.json({
            success: true,
            lesson: lesson

        })

    }
    catch (e) {
        next(e)
    }

}

exports.getQuizByTopicAndLessonId = async (req, res, next) => {

    // get quiz of that course
    try {
        const { topicId, lessonId } = req.params;
        const { course_access } = req;


        // get the quizes of that lesson
        const quizes = await Quizes.findAll({
            where: {
                lesson_id: lessonId,
                course_id: req.params.id,

            },
            attributes: ['id', 'title', 'options', 'questionType', 'numOptions','question_image']

        })

        // filter the quizes and remove isCorrect from options array
        const filteredQuizes = quizes.map(quiz => {
            return {
                ...quiz.dataValues,
                options: JSON.parse(quiz.options).map(option => ({ id: option.id, text: option.text, option_image: option.option_image }))
            }
        })


        // filter the quizes and remove
        res.json({
            success: true,
            quizes: filteredQuizes
        })


    } catch (err) {
        next(err)
    }

}



// Function to check answers and get the result
async function checkAnswers(quizWithCorrectAnswerArray, quizAnswers) {
    let rightAnswers = 0;
    const userAnswers = [];
    const correctQuizes = [];


    quizWithCorrectAnswerArray.forEach((quiz, index) => {
        const quizAnswer = quizAnswers.find(quizAnswer => quizAnswer.id == quiz.id);

        if (quizAnswer) {
            userAnswers.push(quizAnswer.answers)


            const isEqualLength = quizAnswer.answers.length === JSON.parse(quiz.correctAnswers).length;

            if (isEqualLength) {

                const isCorrect = quizAnswer.answers.every(answer => quiz.correctAnswers.includes(answer));
                if (isCorrect) {
                    correctQuizes.push(quiz.id);
                    rightAnswers++;
                }

            }

        }
        else {
            userAnswers.push([])
        }
    });




    return [rightAnswers, userAnswers, correctQuizes];
}

async function updateUserCourseProgress(courseId, userId, lessonId, totalLessons) {

    const userCourse = await UserCourse.findOne({
        where: {
            user_id: userId,
            course_id: courseId
        }
    })

    if (userCourse) {

        if (userCourse.completed_lessons) {

            const completedLessonsArray = JSON.parse(userCourse.completed_lessons);
            // console.log(completedLessons)
            // // convert string to array
            // const completedLessonsArray = JSON.parse(completedLessons)


            // check if the lesson is already in the array or not
            const isLessonCompleted = completedLessonsArray.find(id => id == lessonId)
            // console.log("IsCOmpletedlesson ",isLessonCompleted)
            if (!isLessonCompleted) {


                completedLessonsArray.push(lessonId)
                // console.log("Total lesson completed ",completedLessonsArray.length)
                userCourse.completed_lessons = completedLessonsArray
                userCourse.progress = Math.ceil((completedLessonsArray.length / totalLessons) * 100)

            }


        } else {
            const completedLessonsArray = [lessonId]
            // console.log("Total lesson completed ",completedLessonsArray.length)

            userCourse.completed_lessons = completedLessonsArray
            userCourse.progress = Math.ceil((completedLessonsArray.length / totalLessons) * 100)
        }

        // console.log(JSON.parse(JSON.parse(userCourse.completed_lessons)).length)
        // console.log(typeof userCourse.completed_lessons == "string")
        if (typeof userCourse.completed_lessons == "string") {
            // console.log("String")
            userCourse.completed_lessons = JSON.parse(userCourse.completed_lessons)
        }

        // console.log(userCourse.completed_lessons.length)
        // console.log(totalLessons)
        if (userCourse.progress == 100) {
            userCourse.status = 'completed'
        }





    }
    const updatedUserCourse = await userCourse.save()
}

exports.submitQuiz = async (req, res, next) => {
    /**
         [
             {
                 id: 15,
                 answers: [1, 2],
             },
             {
                 id: 15,
                 answers: [1, 2],
             }, {
                 id: 15,
                 answers: [1, 2],
             }
         ]
     */

    try {

        const { topicId, lessonId } = req.params;
        const { course_access } = req

        // get the quizes of that lesson

        const quizes = await Quizes.findAll({
            where: {
                lesson_id: lessonId,
                course_id: req.params.id,

            },
            // exclude created_at and updated_at
            attributes: { exclude: ['created_at', 'updated_at'] }

        })

        // filter the quizes and remove isCorrect from options array
        const [marks, userAnswers, correctQuizes] = await checkAnswers(quizes, req.body.user_answers)
        // console.log("Marks ",marks);
        // console.log("USer Answers ",userAnswers);

        // check if the user has already submitted the quiz
        const quizAttempt = await UserQuizAttempt.findOne({
            where: {
                user_id: req.user.id,
                lesson_id: lessonId,
            }
        })

        if (quizAttempt) {
            // update the quiz attempt
            await UserQuizAttempt.update({
                marks,
                userAnswers: userAnswers,
                correctQuizes: correctQuizes
            }, {
                where: {
                    id: quizAttempt.id
                }
            })
        } else {
            // create a new quiz attempt
            await UserQuizAttempt.create({
                user_id: req.user.id,
                lesson_id: lessonId,
                marks,
                userAnswers: userAnswers,
                correctQuizes: correctQuizes,
                course_id: req.params.id,
                totalMarks: quizes.length
            })

        }

        // check if the marks is greater than 50% or not, then update progress

        const isPassed = marks >= (quizes.length * .4);
        // const isPassed = true;
        if (isPassed) {
            // update the progress in UserCourse model

            // get the total lessons
            // console.log(req.filteredTopics)
            const totalLessons = req.filteredTopics.reduce((total, topic) => {
                return total + topic.lessons.length
            }, 0)
            // console.log(lessonId)
            await updateUserCourseProgress(req.params.id, req.user.id, lessonId, totalLessons)

        }





        const updatedQuizes = quizes.map(quiz => {
            return {
                id: quiz.id,
                title: quiz.title,
                questionType: quiz.questionType,
                question_image: quiz.question_image,
                lesson_id: quiz.lesson_id,
                options: JSON.parse(quiz.options).map(option => ({ id: option.id, text: option.text,option_image:option.option_image }))
            }
        });

        // Iterate over the quizes array
        updatedQuizes.forEach((quiz, index) => {
            // Get the user's answer for the current quiz
            const userAnswer = userAnswers[index];
            //   console.log(userAnswer)
            // Iterate over the options in the current quiz
            quiz.options.forEach((option) => {
                // Set isSelected property to true if the user's answer is correct for this option
                delete option.isCorrect;
                option.isSelected = userAnswer.includes(quiz.options.indexOf(option));

            });
            // quiz.userAnswers = userAnswer;
            quiz.isCorrect = correctQuizes.includes(quiz.id)
        });







        // filter the quizes and remove
        res.json({
            success: true,
            marks: marks,
            totalQuizes: quizes.length,
            data: updatedQuizes
        })



    }
    catch (e) {
        next(e)
    }
}


exports.checkCompletedLessonUpdate = async (req, res, next) => {

    try {

        return res.json({
            updatedUserCourse
        })


    }
    catch (e) {
        next(e)
    }
}

exports.getQuizAttemptDetails = async (req, res, next) => {
    try {

        // get the quiz attempt details of the user
        const quizAttempt = await UserQuizAttempt.findOne({
            where: {
                user_id: req.user.id,
                lesson_id: req.params.lessonId,
            },
            raw: true,
            attributes: ["id", "lesson_id", "marks", "userAnswers", "correctQuizes", "totalMarks"]
        })

        if (!quizAttempt) {
            throw new Error("Quiz attempt not found")
        }


        // get the quizes of that lesson and answers also
        let quizes = await Quizes.findAll({
            where: {
                lesson_id: req.params.lessonId,
                course_id: req.params.id,
            },
            raw: true,

            attributes: [
                "id", "lesson_id", "course_id", "title", "options", "questionType",
                "question_image"
            ]
        });

        if (!quizes) {
            throw new Error("Quiz not found")
        }

        const userAnswers = JSON.parse(quizAttempt.userAnswers);
        const correctQuizes = JSON.parse(quizAttempt.correctQuizes) || []



        quizes = quizes.map(quiz => {
            return {
                ...quiz,
                options: JSON.parse(quiz.options).map(option => ({ id: option.id, text: option.text, option_image: option.option_image }))
            }
        });

        // Iterate over the quizes array
        quizes.forEach((quiz, index) => {
            // Get the user's answer for the current quiz
            const userAnswer = userAnswers[index];
            //   console.log(userAnswer)
            // Iterate over the options in the current quiz
            quiz.options.forEach((option) => {
                // Set isSelected property to true if the user's answer is correct for this option
                delete option.isCorrect;
                option.isSelected = userAnswer.includes(quiz.options.indexOf(option));

            });
            // quiz.userAnswers = userAnswer;
            quiz.isCorrect = correctQuizes.includes(quiz.id)
        });



        // quizes = updatedQuizes;
        // get the answers of the quiz
        return res.json({
            success: true,
            marks: quizAttempt.marks,
            totalMarks: quizAttempt.totalMarks,
            data: quizes,


        })



    }
    catch (e) {
        // console.log(e)
        next(e)
    }
}