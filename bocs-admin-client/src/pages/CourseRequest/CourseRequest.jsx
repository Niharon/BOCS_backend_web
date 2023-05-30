import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import { getAllCourseRequestsApi } from "../../api/courseRequest";
import LoadingScreen from "../../components/LoadingScreen";
import CourseRequestTableRow from "./CourseRequestTableRow";

const CourseRequest = () => {

  const [courseRequests, setCourseRequests] = useState([]);

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["courseRequests"],
      queryFn: getAllCourseRequestsApi,
      onSuccess: (data) => {
        // console.log(data.data);
        setCourseRequests(data.data);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to load course requests");
      },
    }
  );

  // console.log(courseRequests)
  if(isLoading){
    return <LoadingScreen/>
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Course Request" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    User
                  </th>
                  <th className="min-w-[300px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Course
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">
                    Payment Status
                  </th>
                  <th className="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                courseRequests.map((courseRequest) => (
                  <CourseRequestTableRow key={courseRequest.id} item={courseRequest}/>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CourseRequest;
