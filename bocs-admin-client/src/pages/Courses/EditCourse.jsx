import React from 'react'
import CourseDetailsForm from '../../components/forms/CourseDetailsForm';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import TabLayout from '../../layout/TabLayout';


const tabItems = [
    {
      label: "Basic Info",
      component: <CourseDetailsForm />
    },

  ];
const EditCourse = () => {

    
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Edit Course" />
    
          <TabLayout
            tabItems={tabItems}
    
          />
    
        
        </DefaultLayout>
      );
}

export default EditCourse