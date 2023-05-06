import axiosInstance from "../axiosInstance/axiosInstance"


export const createLessonApi = async (lesson) => {
    const res = await axiosInstance.post('/lesson', lesson);
    return res
}

export const updateLessonApi = async ({id,data})=>{
    const res = await axiosInstance.patch(`/lesson/${id}`, data);
    return res;
}