import axiosInstance from "../axiosInstance/axiosInstance"

const postCourse = async (data) => {
    const res = await axiosInstance.post('/course/create', data);
    return res;
}

export default postCourse;