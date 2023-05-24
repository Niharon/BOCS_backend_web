import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import LoadingButton from "../LoadingButton";
import { CourseContext } from "../../App";
import { getCourseById, postCourse, updateCourseApi } from "../../api/courseApi";
import { dirtyValues } from "../../utils/dirtyFields";
import { toast } from "react-hot-toast";

const CourseDetailsEditForm = ({refetch}) => {



  const { courseContext, setcourseContext } = useContext(CourseContext);
  const { currentCourse } = courseContext;
  const {
    register,
    setValue,
    formState: { isDirty, dirtyFields },
    handleSubmit,
    watch,
    
  } = useForm();


  useEffect(()=>{
    function updateInputField(){
        setValue("title", currentCourse?.title);
        setValue("description", currentCourse?.description);
        setValue("price", currentCourse?.price);
        setValue("access_duration", currentCourse?.access_duration);
        setValue("intro_video", currentCourse?.intro_video);
        setValue("course_thumbnail", currentCourse?.course_thumbnail);
    }
    updateInputField();
  },[currentCourse])
  const {
    mutate,
    isLoading,
    data: response,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateCourseApi,
    onSuccess: async (data, variable, context) => {
      await refetch();
      toast.success("Course Updated Successfully");
    },
    onError(error, variables, context) {
      console.log(error);
     
    },
    
  });

  const onSubmit = (data) => {

    const modifiedData = dirtyValues(dirtyFields,data)
    // console.log(data);
    // if course_thumbnail in modifiedData , make it as a formdata
    if(modifiedData.course_thumbnail){
      // console.log("changed the thumbnail")
      const formdata = new FormData();

      for(let key in modifiedData){
          if(key === "course_thumbnail"){
            formdata.append(key,modifiedData[key][0]);
          }else{
            formdata.append(key,modifiedData[key]);
          }
      }
      mutate({id:currentCourse.id,data:formdata});


    }
    else{

      mutate({id:currentCourse.id,data:modifiedData});
    }
    console.log({id:currentCourse.id,data:modifiedData});

    // navigate("/course/edit/1");
  };
 


  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
              <div className="w-full xl:w-1/2">
                <Input
                  value={currentCourse?.title}
                  register={register}
                  label="Course Title"
                  isRequied={true}
                  type="text"
                  registerText="title"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <Input
                 value={currentCourse?.price}

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
                  value={currentCourse?.intro_video}
                  register={register}
                  label="Intro Video Link"
                  isRequied={true}
                  type="url"
                  registerText="intro_video"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <Input
                value={currentCourse?.access_duration}
                  register={register}
                  label="Access Duration (in days)"
                  isRequied={true}
                  type="number"
                  registerText="access_duration"
                />
              </div>
            </div>
            <div className="mb-6 md:flex gap-5">
              {
                currentCourse?.course_thumbnail && 
                <img src={!currentCourse?.course_thumbnail ? currentCourse?.course_thumbnail : "https://via.placeholder.com/200x200"} alt="course thumbnail" className="w-1/8 h-1/8" />
              }
              <Input
              value={currentCourse?.course_thumbnail}
                register={register}
                label="Course Thumbnail"
                type="image"
                registerText="course_thumbnail"
              />
            </div>

            <div className="mb-6">
              <Input
              value={currentCourse?.description}
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
                Update
              </button>
            }
       
      
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetailsEditForm;
