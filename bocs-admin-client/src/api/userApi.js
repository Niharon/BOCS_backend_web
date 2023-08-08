import axiosInstance from "../axiosInstance/axiosInstance";

export const getAllUsersApi = async (page) => {
    // console.log(page.queryKey[1])
    const res = await axiosInstance.get(`/users?page=${page.queryKey[1]}`);
    return res.data;
}
export const updateUserApi = async ({ id, data }) => {
    const res = await axiosInstance.patch(`/users/${id}`, data);
    return res.data;
}   

export const deleteUserApi = async (id) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
}