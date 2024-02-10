import axiosInstance from "../axiosInstance/axiosInstance";


export const createUserByAdminApi = async (data) => {
    const res = await axiosInstance.post("/users", data);
    return res.data;
}
export const getAllUsersApi = async (query) => {
    console.log(query)
    const res = await axiosInstance.get(`/users?page=${query.queryKey[1]}&search=${query.queryKey[2]}`);
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