import React, { useContext, useEffect } from "react";
import LessonAccordion from "./LessonAccordion";
import { Box } from "@mui/material";
import { CourseContext } from "../../App";

const CourseLessonForm = () => {

  const [allLessons, setAllLessons] = React.useState([]);
  const { courseContext, setcourseContext, } = useContext(CourseContext);
  const {currentCourse} = courseContext;

  console.log(currentCourse);

  const addNewLessonToAdd = ()=>{
    setAllLessons([...allLessons, {
      title:"New Lesson Title",
      course_id:currentCourse?.id || null,
      topic_id:"",
      description:"",
      video:"",
      pdf:"",
    }])
  }


  useEffect(()=>{

    setAllLessons(currentCourse?.lessons)

  },[courseContext,currentCourse])
  return (
    <>
      {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form method="post">
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Title</label>
            <input
              type="text"
              placeholder="Lesson Title"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Course Id</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">Select Course Id</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
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
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Topic Id</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">Select Topic Id</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
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
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Video</label>
            <input
              type="text"
              placeholder="Video Url"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Pdf</label>
            <input
              type="text"
              placeholder="Pdf Url"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">Description</label>
            <textarea
              rows={6}
              placeholder="Lesson Description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>
          <button className="flex w-1/4 m-auto justify-center  rounded bg-primary p-3 font-medium text-gray">
            Submit
          </button>
        </div>
      </form>
    </div> */}

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        px: '1rem',
      }}>
        {
          allLessons.map((lesson, index) => (
            <LessonAccordion key={index} lesson={lesson}/>

          ))
        }

        <div className="mt-4 flex justify-end gap-3">
        {/* <button
          onClick={createAllTopic}
          className=" flex w-1/5 items-center justify-center rounded bg-success p-2 font-medium text-gray"
        >
          Save All
        </button> */}
        <button
          onClick={addNewLessonToAdd}
          className=" flex w-1/5 items-center justify-center rounded bg-primary p-2 font-medium text-gray"
        >
          Add New Lesson
        </button>
      </div>
      </Box>
    </>
  );
};

export default CourseLessonForm;
