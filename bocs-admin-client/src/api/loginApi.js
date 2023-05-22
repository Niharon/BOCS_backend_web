import userAxiosInstance from "../axiosInstance/userAxiosInstance";

export const loginApi = (data) => {
    const res = userAxiosInstance.post("/login", data);
    return res;
}