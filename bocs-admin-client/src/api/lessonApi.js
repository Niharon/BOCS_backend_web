import axiosInstance from "../axiosInstance/axiosInstance"


export const createLessonApi = async (lesson) => {
    const res = await axiosInstance.post('/lesson', lesson);
    return res
}

export const getLessonByIdApi = async (id) => {
    const res = await axiosInstance.get(`/lesson/${id}`);
    return res.data;
}

export const updateLessonApi = async ({id,data})=>{
    const res = await axiosInstance.patch(`/lesson/${id}`, data);
    return res;
}

export const updateLessonOrderApi = async (data)=>{
    const res = await axiosInstance.post(`/lesson/update-order`, data);
    return res;
}