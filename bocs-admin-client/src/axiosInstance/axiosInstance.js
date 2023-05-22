import axios from "axios";

const apiURL = import.meta.env.VITE_BACKEND_URL + "api/admin/";
// create a axios instance
const axiosInstance = axios.create({
    baseURL: apiURL,
  
   
});

export default axiosInstance;