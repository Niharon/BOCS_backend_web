import axiosInstance from "../axiosInstance/axiosInstance"


export const createCourseRequestApi = async (data) => {
    const res = await axiosInstance.post(`/course-requests`, data);
    return res;
};
export const getAllCourseRequestsApi = async (param) => {
    // console.log(param.queryKey[1])
    const res = await axiosInstance.get(`/course-requests?page=${param.queryKey[1]+1}`,);
    return res;
}
export const getCourseRequestByIdApi = async (data) => {
    
    const res = await axiosInstance.get(`/course-requests/${data.queryKey[1]}`,);
    return res;
}

export const updateCourseRequestStatusApi = async ({id, data}) => {
    const res = await axiosInstance.patch(`/course-requests/${id}`, data);
    return res;
}
