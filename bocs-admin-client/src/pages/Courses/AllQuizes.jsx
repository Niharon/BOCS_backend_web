import { useEffect, useState } from "react";
import {Button,Grid} from "@mui/material";

import DefaultLayout from "../../layout/DefaultLayout";
import QuizAccordion from "../../components/forms/QuizAccordion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonByIdApi } from "../../api/lessonApi";
import LoadingScreen from "../../components/LoadingScreen";

const questionData = {
  title: "Question Text",
  question_image: null,
  questionType: "single",
  numOptions: 4,
  options: [
      { text: "", option_image: null, isCorrect: false },
      { text: "", option_image: null, isCorrect: false },
      { text: "", option_image: null, isCorrect: false },
      { text: "", option_image: null, isCorrect: false }
  ],
  correct_indexes: []
}
function AllQuizes() {
 
  const [questions, setQuestions] = useState([]);
  const {lessonid} = useParams();
  // console.log(lessonid);

  const {data:lessonData,isLoading,isSuccess,refetch} = useQuery({
    queryKey: ["lessonById",lessonid],  
    queryFn: () => getLessonByIdApi(lessonid),
    onSuccess: (data) => {
      setQuestions(data.lesson.quizes);
    },
    onError: (error) => {
      console.log(error);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const handleAddQuizForm = () => {
    
    const newOptions = [...questions, {...questionData}];
    setQuestions(newOptions);
  };

  useEffect(()=>{
    if(isSuccess){
      // console.log(lessonData);
      // setQuestions(lessonData.quiz);
    }
  },[lessonData])

  useEffect(()=>{
    refetch();
  },[lessonid])

  if(isLoading){
    return <LoadingScreen/>
  }

  return (
    <DefaultLayout>
      {
        questions.map((question, index) => (
          <QuizAccordion
          key={index}
          question={question}
          index={index}
          refetch={refetch}
          course_id={lessonData.lesson.course_id}
          lesson_id={lessonData.lesson.id}

          />
        ))

      }
   

      <Grid item xs={12} mt={5}>
        <Button variant="contained" onClick={handleAddQuizForm}>
          Add New Quiz
        </Button>
      </Grid>
    </DefaultLayout>
  );
}
export default AllQuizes;
