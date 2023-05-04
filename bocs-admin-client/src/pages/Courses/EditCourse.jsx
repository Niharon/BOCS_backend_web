import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import TabLayout from "../../layout/TabLayout";
import { getCourseById } from "../../api/courseApi";
import {  useQuery } from "@tanstack/react-query";
import CourseDetailsEditForm from "../../components/forms/CourseDetailsEditForm";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { CourseContext } from "../../App";
import CourseTopicForm from "../../components/forms/CourseTopicForm";

  


const EditCourse = () => {
  const { id } = useParams();

    // const use courseContext and setcourseContext from App.jsx
    const { courseContext, setcourseContext } = useContext(CourseContext);
    // console.log(courseContext)
  const { data, isLoading, isSuccess, isError,refetch } = useQuery(
    ["currentCourse", id],
    () => getCourseById(id),
    {
        refetchOnWindowFocus: false,

    }
  );

  const tabItems = [
    {
    label: "Basic Info",
    component: <CourseDetailsEditForm refetch={refetch}/>,
    },
  
    {
      label: "Topics",
      component: <CourseTopicForm refetch={refetch} />,
  },
];


  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setcourseContext({
        ...courseContext,
        currentCourse: data.data.course,
      })
      
    }
    if (isError) {
      console.log(data);
    }
  }, [isSuccess, isLoading, isError, data]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Edit Course" />

        <TabLayout tabItems={tabItems} />
      </DefaultLayout>
    );
  }
};

export default EditCourse;
