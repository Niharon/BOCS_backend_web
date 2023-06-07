// Quiz data
const quizData = [
    {
        "id": 15,
        "title": "Question Text 1",
        "options": "[{\"text\":\"1\",\"isCorrect\":true},{\"text\":\"2\",\"isCorrect\":false},{\"text\":\"3\",\"isCorrect\":true},{\"text\":\"4\",\"isCorrect\":false}]",
        "lesson_id": 6,
        "course_id": 8,
        "created_at": "2023-06-03T10:25:47.000Z",
        "updated_at": "2023-06-03T10:25:47.000Z"
    },
    {
        "id": 16,
        "title": "Question Text 1",
        "options": "[{\"text\":\"1\",\"isCorrect\":true},{\"text\":\"2\",\"isCorrect\":false},{\"text\":\"3\",\"isCorrect\":true},{\"text\":\"4\",\"isCorrect\":true}]",
        "lesson_id": 6,
        "course_id": 8,
        "created_at": "2023-06-03T10:25:47.000Z",
        "updated_at": "2023-06-03T10:25:47.000Z"
    },
    {
        "id": 17,
        "title": "Question Text 1",
        "options": "[{\"text\":\"1\",\"isCorrect\":true},{\"text\":\"2\",\"isCorrect\":false},{\"text\":\"3\",\"isCorrect\":false},{\"text\":\"4\",\"isCorrect\":false}]",
        "lesson_id": 6,
        "course_id": 8,
        "created_at": "2023-06-03T10:25:47.000Z",
        "updated_at": "2023-06-03T10:25:47.000Z"
    }
];

// API quiz answers
const quizAnswers = [
    {
        id: 15,
        answers: [0,1],
    },
    {
        id: 16,
        answers: [0,2,3],
    },
    {
        id: 17,
        answers: [0],
    }
];

// Function to check answers and get the result
function checkAnswers(quizData, quizAnswers) {
    let rightAnswers = 0;
    // console.log(quizAnswers)
    const quizWithCorrectAnswerArray = quizData.map((quiz, index) => {

        // get the correct aswers index from quizData
        const correctAnswers = [];
        JSON.parse(quiz.options).forEach((option, index) => {
            if (option.isCorrect) {
                correctAnswers.push(index);
            }
        });
        const givenAnswers = quizAnswers.find(quizAnswer => quizAnswer.id === quiz.id);
        
        return {
            quiz_id:quiz.id,
            title: quiz.title,
            options:quiz.options,
            lesson_id:quiz.lesson_id,
            course_id:quiz.course_id,
            correctAnswers,
            givenAnswers: givenAnswers ? givenAnswers.answers : []
        }


    });
    console.log(quizWithCorrectAnswerArray)

    // check the answers
    quizWithCorrectAnswerArray.forEach((quiz, index) => {
        const quizAnswer = quizAnswers.find(quizAnswer => quizAnswer.id === quiz.quiz_id);
        if (quizAnswer) {
            const isCorrect = quizAnswer.answers.every(answer => quiz.correctAnswers.includes(answer));
            if (isCorrect) {
                rightAnswers++;
            }
        }
    });



    return rightAnswers;
}

// Check answers and get the result
const quizResult = checkAnswers(quizData, quizAnswers);
console.log(quizResult);
