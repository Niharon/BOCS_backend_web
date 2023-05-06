import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import TabLayout from "../../layout/TabLayout";
import CourseRequestUpdateForm from "../../components/forms/CourseRequestUpdateForm";


const CourseRequestEdit = () => {

  const tabItems = [
    {
      label: "Course Request",
      component: <CourseRequestUpdateForm/>,
  },
];
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Course Request Update" />

        <TabLayout tabItems={tabItems} />
      </DefaultLayout>
    );
  }


export default CourseRequestEdit;
