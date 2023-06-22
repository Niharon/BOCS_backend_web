import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCourseRequestByIdApi, updateCourseRequestStatusApi } from "../../api/courseRequest";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-hot-toast";
import LoadingButton from "../LoadingButton";

const CourseRequestUpdateForm = () => {

  const [courseRequest, setCourseRequest] = useState({});
  const navigate = useNavigate();

  const [Requeststatus, setRequestStatus] = useState("pending");
  const [disabled, setDisabled] = useState(true);

  const { id } = useParams();
  const getCourseRequestDetailsQuery = useQuery({
    queryKey: ["courseRequest", id],
    queryFn: getCourseRequestByIdApi,
    onSuccess: (data) => {
      // console.log(data.data);
      setCourseRequest(data.data);
      setRequestStatus(data.data.status);
    },
    onError: (error) => {
      console.log(error);
      // navigate to back page 
      navigate("/course-request");


    }
  })

  const updateStatusMutation = useMutation({
    mutationKey: ["updateCourseRequestStatus", id],
    mutationFn: updateCourseRequestStatusApi,
    onSuccess: (data) => {
      console.log(data.data);
      toast.success("Course Request Updated Successfully");
      setDisabled(true);
      getCourseRequestDetailsQuery.refetch()
    },
    onError: (error) => {
      console.log(error);
    }
  })

  if (getCourseRequestDetailsQuery.isLoading || getCourseRequestDetailsQuery.isFetching) {
    return <LoadingSpinner />
  }

  const { user, course, created_at, sender_number, payment_id, payment_method, payment_status, status, payment_amount, access } = getCourseRequestDetailsQuery?.data?.data;

  const updateStatus = (e) => {
    e.preventDefault();
    // console.log(Requeststatus);
    updateStatusMutation.mutate({ id, data: { status: Requeststatus } });
  }

  const handleStatusChange = (value) => {
    if(status === "confirmed"){
      alert("You can't change the status of a confirmed request")
      return;
    }
    setRequestStatus(value);
    console.log(value, status)
    if(value !== status){
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  }


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

        <div className="flex flex-col w-full  md:gap-5 md:flex">
          <Typography variant="p" fontWeight={"bold"} className="mb-2.5">
            Reuqested on : {new Date(created_at).toDateString()}
          </Typography>
          <div className="block md:gap-5 md:flex">
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">User Name</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={user?.name} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Course Name</label>
              <input
                type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={course?.title} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">User Email</label>
              <input type="email"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={user?.email} readOnly />
            </div>
          </div>

          <div className="block md:gap-5 md:flex">
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Sender Number</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={sender_number} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Transaction No.</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={payment_id} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Payment Method</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-white py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={payment_method} readOnly />
            </div>

          </div>
          <div className="block md:gap-5 md:flex">
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Amount</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                value={payment_amount} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Payment Status</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"


                value={payment_status} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Course Access</label>
              <input type="text"

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"


                value={access} readOnly />
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">
                Status
                <span className="text-meta-1">*</span>
              </label>
              <select
                defaultValue={status}
                onChange={(e) => {
                  handleStatusChange(e.target.value);
                }}
                required

                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

              >
          
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <form onSubmit={updateStatus}>
          <div className="flex justify-center mt-4">
            {
              updateStatusMutation.isLoading ? <LoadingButton/> 
              :
              <button disabled={disabled} type="submit" className={`rounded ${disabled ? 'bg-body' : 'bg-success'} p-2 px-5 font-medium text-gray`}>Update</button>
            } 
          </div>
        </form>
      </Box>
    </>
  );
};

export default CourseRequestUpdateForm;
