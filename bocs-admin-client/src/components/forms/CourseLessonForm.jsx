import React, { useContext, useEffect, useState } from "react";
import LessonAccordion from "./LessonAccordion";
import { Box } from "@mui/material";
import { CourseContext } from "../../App";

const CourseLessonForm = ({ refetch }) => {
  const { courseContext, setcourseContext } = useContext(CourseContext);
  const { currentCourse } = courseContext;

  const [allLessons, setAllLessons] = useState([]);
  // console.log(currentCourse);

  const addNewLessonToAdd = () => {
    setAllLessons([
      ...allLessons,
      {
        title: "New Lesson Title",
        course_id: currentCourse?.id || null,
        topic_id: "",
        description: "",
        video: "",
        pdf: "",
      },
    ]);
  };



  useEffect(() => {
    setAllLessons(currentCourse?.lessons || []);
  }, [courseContext, currentCourse]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          px: "1rem",
        }}
      >
        {
          currentCourse.topics.length ===0 &&
          <p className="text-center text-danger">
            Add Atleast one Topic to add Lessons

          </p>
        }
        {allLessons.map((lesson, index) => (
          <LessonAccordion
            key={index}
            index={index}
            lesson={lesson}
            topics={currentCourse.topics}
            course_id={currentCourse.id}
            refetch={refetch}
          />
        ))}

        <div className="mt-4 flex justify-end gap-3">
          {/* <button
          onClick={createAllTopic}
          className=" flex w-1/5 items-center justify-center rounded bg-success p-2 font-medium text-gray"
        >
          Save All
        </button> */}
          <button
            disabled={currentCourse.topics.length == 0}
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
