import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllInstructorsApi = async () => {


    const response = await axiosInstance.get("/instructors");
    return response;
}
