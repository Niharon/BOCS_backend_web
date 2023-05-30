import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingButton from "../LoadingButton";
import { postCourse } from "../../api/courseApi";

const CourseDetailsForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading,
    data: response,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: postCourse,
    onSuccess: async (data, variable, context) => {
      // console.log("success");
      await queryClient.refetchQueries("courses");
      if(data?.data?.course.id){
        navigate(`/courses/edit/${data.data.course.id}`)
      }
      
    },
  
    onError(error, variables, context) {
      console.log(error);
      console.log(variables);
      console.log(context);
    },
    
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("intro_video", data.intro_video);
    formData.append("access_duration", data.access_duration);
    formData.append("description", data.description);
    formData.append("course_thumbnail", data.course_thumbnail[0]);




    mutate(formData);
    // navigate("/course/edit/1");
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              <div className="w-full xl:w-1/2">
                <Input
                  register={register}
                  label="Course Title"
                  isRequied={true}
                  type="text"
                  registerText="title"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <Input
                  register={register}
                  label="Course Price"
                  isRequied={true}
                  type="number"
                  registerText="price"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              <div className="w-full xl:w-1/2">
                <Input
                  register={register}
                  label="Intro Video Link"
                  isRequied={true}
                  type="url"
                  registerText="intro_video"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <Input
                  register={register}
                  label="Access Duration (in days)"
                  isRequied={true}
                  type="number"
                  registerText="access_duration"
                />
              </div>
            </div>
            <div className="mb-6">
              <Input
                register={register}
                label="Course Thumbnail"
                type="image"
                registerText="course_thumbnail"
              />
            </div>

            <div className="mb-6">
              <Input
                register={register}
                label="Description"
                type="textarea"
                registerText="description"
              />
            </div>

            {
                isLoading
                ? 
                <LoadingButton/>
                :
                <button
                type="submit"
                className="m-auto flex w-1/4  justify-center rounded bg-primary p-2 font-medium text-gray"
              >
                Submit
              </button>
            }
       
      
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetailsForm;
