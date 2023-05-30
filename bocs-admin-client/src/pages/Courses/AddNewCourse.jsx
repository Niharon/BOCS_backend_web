
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import TabLayout from '../../layout/TabLayout';

import CourseDetailsForm from '../../components/forms/CourseDetailsForm';

const tabItems = [
  {
    label: "Basic Info",
    component: <CourseDetailsForm />
  },
];
const AddNewCourse = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Course" />

      <TabLayout
        tabItems={tabItems}

      />

    
    </DefaultLayout>
  );
};

export default AddNewCourse;
