import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllInstructorsApi = async () => {


    const response = await axiosInstance.get("/instructors");
    return response;
}


export const createInstructorApi = async (instructor) => {
    const res = await axiosInstance.post('/instructors', instructor);
    return res
}

export const getInstructorByIdApi = async (data) => {
    const id =  data.queryKey[1];
    const res = await axiosInstance.get(`/instructors/${id}`);
    return res
}

export const updateInstructorApi = async ({id,data}) => {

    const res = await axiosInstance.patch(`/instructors/${id}`, data);
    return res
}