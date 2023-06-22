import axiosInstance from "../axiosInstance/axiosInstance";

export const updateUserApi = async ({ id, data }) => {
    const res = await axiosInstance.patch(`/users/${id}`, data);
    return res.data;
}   