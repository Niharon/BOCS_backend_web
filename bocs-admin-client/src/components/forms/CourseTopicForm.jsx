import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../App";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteTopicById,
  postSingleTopic,
  updateTopicApi,
} from "../../api/topicApi";
import { FaTrash } from "react-icons/fa";
import { deleteCourseById } from "../../api/courseApi";
import { toast } from "react-hot-toast";
import LoadingButton from "../LoadingButton";

const CourseTopicForm = ({ refetch }) => {
  const { id } = useParams();
  const [allTopics, setallTopics] = useState([]);

  const { courseContext, setcourseContext } = useContext(CourseContext);
  const { topics } = courseContext.currentCourse;

  // console.log(topics)
  const appendNewTopic = () => {
    setallTopics([...allTopics, { title: "New Topic", course_id: id }]);
  };

  useEffect(() => {
    setallTopics(topics);
  }, [topics]);

  const deleteTopicQuery = useMutation((id) => deleteTopicById(id), {
    onSuccess: () => {
      console.log("deleted");
      toast.success("Topic Deleted Successfully");
      refetch();
    },
  });

  const {
    mutate: createSingleTopicQuery,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: postSingleTopic,
    onSuccess: (data, variable) => {
      console.log("success");
      toast.success("Topic Created");
      refetch();
    },
  });

  const updateTopicQuery = useMutation({
    mutationFn: updateTopicApi,
    onSuccess: (data, variable) => {
      // console.log("success");
      toast.success("Topic Updated");
      refetch();
    },
  });

  const createSingleTopic = (index) => {
    createSingleTopicQuery(allTopics[index]);
  };

  const updateTopic = (id) => {
    const data = allTopics.find((t) => t.id === id);
    console.log(data);
    updateTopicQuery.mutate({ id, data });
  };

  const deleteTopic = (id) => {
    const yes = window.confirm(
      "Are you sure you want to delete this Topic? All Lessons under this topic will be Deleted"
    );
    if (yes) {
      deleteTopicQuery.mutate(id);
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating...");
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success("Updated");
    }
  }, [isLoading, isSuccess]);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="p-6.5">
            {allTopics.length === 0 && (
              <p className="text-center text-meta-1">
                No Topics Added, Add Now
              </p>
            )}
            {allTopics.map((topic, index) => {
              return (
                <div key={index} className="mb-4.5">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                   {index+1}. Topic Title
                  </label> */}
                  <div className="flex">
                    <input
                      value={topic?.title}
                      onChange={(e) => {
                        const nT = [...allTopics];
                        nT[index].title = e.target.value;
                        setallTopics(nT);
                      }}
                      type="text"
                      placeholder="Topic Title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    {topic.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateTopic(topic?.id)}
                          className="flex  items-center justify-center rounded bg-primary p-2 font-medium text-gray"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteTopic(topic?.id)}
                          className="flex  items-center justify-center rounded bg-danger p-2 font-medium text-gray"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <>
                        {isLoading ? (
                          <LoadingButton />
                        ) : (
                          <button
                            onClick={() => createSingleTopic(index)}
                            className="flex w-1/5 items-center justify-center rounded bg-primary p-1 font-medium text-gray"
                          >
                            Save
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        {/* <button
          onClick={createAllTopic}
          className=" flex w-1/5 items-center justify-center rounded bg-success p-2 font-medium text-gray"
        >
          Save All
        </button> */}
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
