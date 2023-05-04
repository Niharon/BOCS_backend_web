import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllCourses = async () => {
    const response = await axiosInstance.get("/courses");
    return response;
}
export const getCourseById = async (id) => {
    const response = await axiosInstance.get(`/course/${id}`);
    return response;
}

export const postCourse = async (data) => {
    const res = await axiosInstance.post('/course/create', data);
    return res;
}
