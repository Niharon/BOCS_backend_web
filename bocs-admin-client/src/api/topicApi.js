import axiosInstance from "../axiosInstance/axiosInstance"

export const postSingleTopic = async (data) => {
    const res = await axiosInstance.post('/topic', data);
    return res;
}