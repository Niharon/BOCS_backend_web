import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllRequest = async (data) => {
    const res = await axiosInstance.post('/course-request/all-course-requests', data);
    return res;
}

export const updateRequestById = async ({id, data}) => {
    const res = await axiosInstance.patch(`/course-request/${id}`, data);
    return res;
}
