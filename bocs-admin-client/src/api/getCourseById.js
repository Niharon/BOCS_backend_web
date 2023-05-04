import axiosInstance from "../axiosInstance/axiosInstance"

export const getCourseById = async (id) => {
    const response = await axiosInstance.get(`/course/${id}`);
    return response;
}