import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import QuizAccordion from '../../components/forms/QuizAccordion'

const questionData = {
    title: "Question Text",
    question_image: "https://placehold.co/800x450?text=Placeholder",
    questionType: "single",
    numOptions: 4,
    options: [
        { text: "", image: null, isCorrect: false },
        { text: "", image: null, isCorrect: false },
        { text: "", image: null, isCorrect: false },
        { text: "", image: null, isCorrect: false }
    ],
    correct_indexes: []
}
const AddQuiz = () => {

    const [question, setQuestion] = useState({
        ...questionData
    })


    const navigate = useNavigate();
    const { lessonid, id } = useParams();

    return (
        <DefaultLayout>
            <div className="flex justify-end my-5">
                <Button onClick={() => navigate(-1)} variant="contained" >
                    Go Back
                </Button>
            </div>


            <QuizAccordion

                question={question}
                course_id={id}
                lesson_id={lessonid}

            />
        </DefaultLayout>

    )
}

export default AddQuiz