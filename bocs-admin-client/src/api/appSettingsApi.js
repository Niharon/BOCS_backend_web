import axiosInstance from "../axiosInstance/axiosInstance";

export const appSettingsApi = async () => {
    const res = await axiosInstance.get(`app/version`);
    return res.data;
}   

export const updateVersionApi = async (data) => {
    const res = await axiosInstance.patch(`app/version/update`, data);
    return res.data;
}