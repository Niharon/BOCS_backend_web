import React, { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createQuizApi, updateQuizApi } from "../../api/quizApi";

const QuizAccordion = ({ question, index,refetch,course_id,lesson_id }) => {
  const [questionData, setQuestionData] = useState({ ...question });
  const min = 1;
  const max = 100;


  const createQuizQuery = useMutation({
    mutationKey: "createQuiz",
    mutationFn: createQuizApi,
    onSuccess: (data) => {
      console.log("success");
      toast.success("Quiz Created Successfully");
      refetch()
    },
    onError: (error) => {},
  })

  const updateQuizQuery = useMutation({
    mutationKey: "updateQuiz",
    mutationFn: updateQuizApi,
    onSuccess: (data) => {
      console.log("success");
      toast.success("Quiz Updated Successfully");
      refetch()
    },
    onError: (error) => {},
  })

  const decrement = () => {
    if (questionData.numOptions > min) {
      const updatedNum = questionData.numOptions - 1;
      setQuestionData({ ...questionData, numOptions: updatedNum });
      const newOptions = [...questionData.options];
      // console.log(newOptions.length, num);
    
      setQuestionData((prev) => ({...prev,options:newOptions.slice(0,updatedNum)}));
    }
  };

  const increment = () => {
    if (questionData.numOptions < max) {
      setQuestionData({ ...questionData, numOptions: questionData.numOptions + 1 });
      const newOptions = [...questionData.options, { text: "", isCorrect: false }];
      // console.log(newOptions.length, num);
    
      setQuestionData((prev)=>({...prev,options:newOptions}));
    }
  };
  const handleTitleChange = (e) => {
    setQuestionData({ ...questionData, title: e.target.value });
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionData({ ...questionData, questionType: e.target.value });

    if (e.target.value === "single") {
      console.log("single");
      const newOptions = questionData.options.map((option, index) => ({
        ...option,
        isCorrect: index === 0,
      }));
      setQuestionData((prev)=>({ ...prev, options: newOptions }));
    }
  };

 
  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index].text = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleOptionCheckChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index].isCorrect = value;
    if (questionData.questionType === "single") {
      for (let i = 0; i < newOptions.length; i++) {
        if (i !== index) {
          newOptions[i].isCorrect = false;
        }
      }
    }
    setQuestionData({ ...questionData, options: newOptions });
  };

  const addNewQuiz = (e) => {
    e.preventDefault();
    const count = questionData.options.filter((option) => option.isCorrect === true);
    if (count.length === 0) {
      toast.error("Select atleast one correct answer");
      return;
    }
    // console.log({...questionData,course_id,lesson_id:lesson_id})
    console.log(questionData)
    createQuizQuery.mutate({...questionData,course_id,lesson_id:lesson_id});

    // console.log(questionData);
  };

  const updateQuiz = (e) => {
    e.preventDefault();
    const count = questionData.options.filter((option) => option.isCorrect === true);
    if (count.length === 0) {
      toast.error("Select atleast one correct answer");
      return;
    }
    console.log(questionData);
    updateQuizQuery.mutate({id:questionData.id,data:questionData});

  }
  // useEffect(() => {
  //   console.log(questionData);
  // }, [questionData]);
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            p: ".4rem",
          },
        }}
        expandIcon={<FaExpandArrowsAlt />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{index+1} {questionData.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ px: "1rem" }}>
          <Grid item xs={12}>
            <form onSubmit={(e) => addNewQuiz(e)}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Title"
                  fullWidth
                  margin="normal"
                  value={questionData.title || ""}
                  onChange={handleTitleChange}
                  required
                />
                <RadioGroup
                  row
                  
                  aria-label="question type"
                  name="question type"
                  value={questionData.questionType}
                  onChange={handleQuestionTypeChange}
                >
                  <FormControlLabel
                    value="multiple"
                    control={<Radio />}
                    label="Multiple Choice"
                  />
                  <FormControlLabel
                    value="single"
                    control={<Radio />}
                    label="Single Choice"
                  />
                </RadioGroup>

                <div className="flex items-center my-5 gap-2">
                <FormLabel component="legend">Number of Options</FormLabel>
                  <button
                    className="bg-danger text-white rounded-l px-5 py-2 font-bold"
                    onClick={decrement}
                    disabled={questionData.numOptions === min}
                  >
                    -
                  </button>
                  <input
                    className="border-gray-400 focus:border-blue-500 w-16  border px-4 py-[6.5px] text-center focus:outline-none"
                    type="number"
                    value={questionData.numOptions}
                    min={min}
                    max={max}
                
                    readOnly
                  />
                  <button
                    className="bg-primary text-white rounded-r px-5 py-2 font-bold"
                    onClick={increment}
                    disabled={questionData.numOptions === max}
                  >
                    +
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {questionData?.options.map((option, qindx) => (
                    <div
                      key={qindx}
                      className="flex w-full items-center gap-2 p-2"
                    >
                      <div className="flex w-full items-center">
                        <span className="bg-gray-500 rounded-l  border p-1">
                          {questionData.questionType === "multiple" ? (
                            <Checkbox
                              
                              checked={option.isCorrect}
                              onChange={(e) =>
                                handleOptionCheckChange(qindx, e.target.checked)
                              }
                            />
                          ) : (
                            <Radio
                              checked={option.isCorrect}
                              onChange={(e) =>
                                handleOptionCheckChange(qindx, e.target.checked)
                              }
                              value={option.isCorrect}
                              
                            />
                          )}
                        </span>
                        <input
                          required
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(qindx, e.target.value)
                          }
                          type="text"
                          className="w-full rounded-none border p-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ml-auto">
                  {
                    question.id ? (
                      <button
                      onClick={updateQuiz}
                      type="button"
                      className="rounded bg-secondary p-2 px-5 font-medium text-gray"
                    >
                      Update
                    </button>
                    ):
                    <button
                    type="submit"
                    className="rounded bg-primary p-2 px-5 font-medium text-gray"
                  >
                    Save
                  </button>
                  }
                </div>
              </FormControl>
            </form>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuizAccordion;
