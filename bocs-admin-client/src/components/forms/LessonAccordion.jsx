import React from "react";
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
// import a icon from react-icons

const LessonAccordion = ({lesson}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <Typography>Lesson Title 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            px: "1rem",
          }}
        >
          <div className="mb-5">
 
              <h3 className="font-medium text-black dark:text-white">
                Select Topic
              </h3>
       
            <div className="flex flex-col gap-5.5 pt-5">
              <div>
              
                <div className="relative z-20 bg-white dark:bg-form-input">
                
                  <select {...register("topic_id")} required className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">Select Topic</option>
                    <option value="1">Topic 1</option>
                    <option value="2">Topic 2</option>
               
            
             
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

          
            </div>
          </div>

          <div className="mb-5">
            <Input
              label="Lesson Name"
              register={register}
              registerText="title"
              isRequied={true}
            />
          </div>
          <div className="mb-5">
            <Input
              label="Video Link"
              register={register}
              registerText="video"
            />
          </div>
          <div className="mb-5">
            <Input label="Pdf Link" register={register} registerText="pdf" />
          </div>
          <div className="mb-5">
            <Input label="Description" register={register} registerText="description" type="textarea" />
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LessonAccordion;
