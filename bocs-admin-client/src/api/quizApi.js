import axiosInstance from "../axiosInstance/axiosInstance"


export const createQuizApi = async (data) => {
    console.log(data)
    const res = await axiosInstance.post('/quiz', data);
    return res.data
}