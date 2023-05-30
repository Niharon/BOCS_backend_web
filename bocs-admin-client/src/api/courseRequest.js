import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllCourseRequestsApi = async () => {
    const res = await axiosInstance.get('/course-requests/',);
    return res;
}

export const updateRequestById = async ({id, data}) => {
    const res = await axiosInstance.patch(`/course-request/${id}`, data);
    return res;
}
