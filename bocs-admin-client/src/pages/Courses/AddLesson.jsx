import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import useCourses from '../../hooks/useCourse';
import { Box } from '@mui/material';
import LessonAccordion from '../../components/forms/LessonAccordion';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourseById } from '../../api/courseApi';
import { getTopicById } from '../../api/topicApi';
import decryptUrl from '../../utils/decryptUrl';
import LoadingScreen from '../../components/LoadingScreen';
import LessonAccordionByTopic from '../../components/forms/LessonAccordionByTopic';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateLessonOrderApi } from '../../api/lessonApi';

const AddLesson = () => {

    const { courseid, topicid } = useParams();

    // const use courseContext and setcourseContext from App.jsx
    const { courseContext, setcourseContext } = useCourses();

    const { currentCourse } = courseContext;

    const updateLessonOrderQuery = useMutation({
        mutationFn: updateLessonOrderApi,
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.log(error)
        },
    })
    const { data, isLoading, isSuccess, isError, refetch } = useQuery(
        ["currentCourse", courseid],
        () => getCourseById(courseid),

        {
            refetchOnWindowFocus: false,
        }
    );

    const [allLessons, setAllLessons] = useState([]);

    const addNewLessonToAdd = () => {
        setAllLessons([
            ...allLessons,
            {
                title: "New Lesson Title",
                course_id: currentCourse?.id || null,
                topic_id: "",
                description: "",
                video: "",
                pdf: "",
                order: allLessons.length + 1
            },
        ]);
    };



    useEffect(() => {
        if (isSuccess) {
            if (data) {
                const encryptedCourse = {
                    ...data.data.course, lessons: data.data.course.lessons.map(lesson => ({
                        ...lesson,
                        video: decryptUrl(lesson.video)
                    }))
                }
                setcourseContext({
                    ...courseContext,
                    currentCourse: encryptedCourse,
                })
                const topicById = encryptedCourse.topics.find(topic => topic.id == topicid)
                const lessonsOftheTopic = topicById?.lessons.map(lesson => (
                    {
                        ...lesson,
                        video: decryptUrl(lesson.video)
                    }
                ))
                
                setAllLessons(lessonsOftheTopic);
            }


        }
        if (isError) {
            console.log(data);
        }
    }, [data, isSuccess, isError]);
    // console.log(currentCourse)


    const handleReorder = (startIndex, endIndex) => {
        const reorderedLessons = Array.from(allLessons);
        const [reorderedLesson] = reorderedLessons.splice(startIndex, 1);
        reorderedLessons.splice(endIndex, 0, reorderedLesson);

        const reorderedLessonsWithOrder = reorderedLessons.map((lesson, index) => ({
            ...lesson,
            order: index,
        }));

        const lessonOrder = {};
        reorderedLessonsWithOrder.forEach((lesson) => {
            if(lesson?.id){
                lessonOrder[lesson.id] = lesson.order;
            }
        });
        // console.log(lessonOrder)
        setAllLessons(reorderedLessonsWithOrder);
        // setAllLessons(reorderedLessons);
        updateLessonOrderQuery.mutate(lessonOrder)



        // console.log(startIndex, endIndex)


        // Update the order in the database
        // axios.put('/api/updateLessonOrder', { lessonOrder: reorderedLessons.map(lesson => lesson.id) })
        //     .catch(error => {
        //         // Handle error
        //     });
    };

    const onDragEnd = (result) => {
        // console.log(result)
        if (!result.destination) return;
        handleReorder(result.source.index, result.destination.index);

    };

    // useEffect(() => {
    //     console.table(allLessons)
    // }, [allLessons])

    // console.log(allLessons);
    // console.log(currentCourse);

    if (isLoading) {
        return <LoadingScreen />

    } else {
        return (
            <DefaultLayout>
                <Breadcrumb pageName={`${currentCourse?.title} / ${currentCourse?.topics?.find(topic => topic.id == topicid)?.title}`} />
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: ".5rem",
                            px: "1rem",
                        }}
                    >

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="lessonList" direction="vertical">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>

                                        {allLessons.map((lesson, index) => (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className='mb-2'
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <LessonAccordionByTopic
                                                            key={index}
                                                            index={index}
                                                            lesson={lesson}
                                                            topicid={topicid}
                                                            course_id={currentCourse.id}
                                                            refetch={refetch}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>



                        <div className="mt-4 flex justify-end gap-3">

                            <button
                                disabled={currentCourse?.topics.length == 0}
                                onClick={addNewLessonToAdd}
                                className=" flex md:w-1/5 items-center justify-center rounded bg-primary p-2 font-medium text-gray"
                            >
                                Add New Lesson
                            </button>
                        </div>
                    </Box>
                </>


            </DefaultLayout>
        )

    }

}

export default AddLesson