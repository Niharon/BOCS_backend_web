import axiosInstance from "../axiosInstance/axiosInstance"


export const getTopicById = async (id) => {
    const res = await axiosInstance.get(`/topics/${id}`);
    return res.data;
}

export const postSingleTopic = async ({data,index}) => {
    const res = await axiosInstance.post('/topic', data);
    return res;
}

export const deleteTopicById = async (id) => {
    const response = await axiosInstance.delete(`/topic/${id}`);
    return response;
}

export const updateTopicApi = async ({id, data}) => {
    const res = await axiosInstance.patch(`/topic/${id}`, data);
    return res;
}