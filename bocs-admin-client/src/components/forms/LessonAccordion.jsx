import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { FaExpandAlt, FaExpandArrowsAlt } from "react-icons/fa";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { createLessonApi, updateLessonApi } from "../../api/lessonApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { dirtyValues } from "../../utils/dirtyFields";
import { Link } from "react-router-dom";
// import a icon from react-icons

const LessonAccordion = ({ lesson, topics,course_id,refetch }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors,dirtyFields,isDirty },
    setValue,
  } = useForm();

  const {mutate:createLessonQuery,isLoading,isSuccess} = useMutation({
    mutationKey: "createLesson",

    mutationFn: createLessonApi,
    onSuccess: (data) => {
      console.log("success");
      toast.success("Lesson Created Successfully");
      refetch()
    },
    
    onError(error, variables, context) {
      console.log(error);

    }
  })

  const updateLessonQuery = useMutation({
    mutationFn:updateLessonApi,
    onSuccess:(data)=>{
      refetch()
      toast.dismiss();
      toast.success("Updated Successfully");
    },
    onError:(error)=>{
      console.log(error)
    },
    onMutate:()=>{
      toast.loading("updating..")
    }

  })

  const onSubmit = (data) => {

    console.log(data);
    createLessonQuery({...data,course_id});
  };

  const onUpdate = (data) => {

    if(Object.keys(dirtyFields).length>0){

      const modifiedData = dirtyValues(dirtyFields,data)
      
      updateLessonQuery.mutate({id:lesson.id,data:modifiedData});
    }else{
      toast.error("Change something first to update");
    }

  }

  useEffect(()=>{
    function updateInputField(){
      setValue("id", lesson?.id);
      setValue("title", lesson?.title);
      setValue("description", lesson?.description);
      setValue("video", lesson?.video);
      setValue("pdf", lesson?.pdf);
      setValue("topic_id", lesson?.topic_id);
    }
    updateInputField();
  },[])

  useEffect(()=>{
    if(isLoading){
      toast.loading("Creating Lesson");
    }
    if(isSuccess){
      toast.dismiss();
      toast.success("Lesson Created Successfully")
    }
  },[isLoading,isSuccess])

  
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
        <Typography>{lesson?.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            px: "1rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block w-full  md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Topic
                  <span className="text-meta-1">*</span>
                </label>
                <select
                  {...register("topic_id")}
                  defaultValue={lesson.topic_id}
                  required
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-6 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Topic</option>
                  {topics.map((topic, index) => {
                    return (
                      <option
                        key={index}
                        value={topic.id}
               
                      >
                        {topic.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-2 w-full">
                <Input
                  label="Lesson Title"
                  register={register}
                  registerText="title"
                  isRequied={true}
                />
              </div>
            </div>
            <div className="block w-full md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <Input
                  label="Video Link"
                  register={register}
                  registerText="video"
                />
              </div>
              <div className="mb-2 w-full">
                <Input
                  label="Pdf Link"
                  register={register}
                  registerText="pdf"
                />
              </div>
            </div>
            <div className="mb-2">
              <Input
                label="Description"
                register={register}
                registerText="description"
                type="textarea"
              />
            </div>

            <div className="flex justify-end gap-3">
              {
                lesson.id ? <>
                <Link to={`/courses/edit/${course_id}/lesson/${lesson.id}`} className="rounded bg-secondary p-2 px-5 font-medium text-gray">Add Quiz</Link>
                <button role="update" onClick={handleSubmit(onUpdate)} className="rounded bg-success p-2 px-5 font-medium text-gray">Update</button>
                </> : <button type="submit" className="rounded bg-primary p-2 px-5 font-medium text-gray">
                Save
              </button>
              }
            </div>
          </form>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LessonAccordion;
