import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../App";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { postSingleTopic } from "../../api/topicApi";

const CourseTopicForm = () => {
  const { id } = useParams();
  const [newTopics, setnewTopics] = useState([]);

  const { courseContext, setcourseContext, } = useContext(CourseContext);
  const { topics } = courseContext.currentCourse;

  const queryClient = useQueryClient();
  console.log(topics)
  const appendNewTopic = () => {
    setnewTopics([...newTopics, { title: "New Topic", course_id: id }]);
  };

  const createSingleTopicQuery = useMutation({
    mutationFn: postSingleTopic,
    onSuccess: (data, variable) => {
      console.log("success");
      
      queryClient.invalidateQueries({ queryKey: ['courses'],refetchType:'all' })
      
    }
  });

  const createSingleTopic = ()=>{
    createSingleTopicQuery.mutate(newTopics[newTopics.length-1]);

  }

  const createAllTopic = () => {
    if(newTopics.length ==0) return alert("Add new Topic First to Save");
    console.log(newTopics);
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="p-6.5">

            {topics.map((topic, index) => {
              return (
                <div key={topic?.id} className="mb-4.5">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                   {index+1}. Topic Title
                  </label> */}
                  <div className="flex">
                    <input
                      value={topic?.title}
                      onChange={(e) => {
                        const nT = [...newTopics];
                        nT[index].title = e.target.value;
                        setnewTopics(nT);
                      }}
                      type="text"
                      placeholder="Topic Title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <button className="flex w-1/5 items-center justify-center rounded bg-primary p-1 font-medium text-gray">
                      Update
                    </button>
                  </div>
                </div>
              );
            })}

            {newTopics.map((topic, index) => {
              return (
                <div key={index} className="mb-4.5">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                   {index+1}. Topic Title
                  </label> */}
                  <div className="flex">
                    <input
                      value={topic?.title}
                      onChange={(e) => {
                        const nT = [...newTopics];
                        nT[index].title = e.target.value;
                        setnewTopics(nT);
                      }}
                      type="text"
                      placeholder="Topic Title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <button onClick={createSingleTopic} className="flex w-1/5 items-center justify-center rounded bg-primary p-1 font-medium text-gray">
                      Save
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={createAllTopic}
          className=" flex w-1/5 items-center justify-center rounded bg-success p-2 font-medium text-gray"
        >
          Save All
        </button>
        <button
          onClick={appendNewTopic}
          className=" flex w-1/5 items-center justify-center rounded bg-primary p-2 font-medium text-gray"
        >
          Add New Topic
        </button>
      </div>
    </>
  );
};

export default CourseTopicForm;
