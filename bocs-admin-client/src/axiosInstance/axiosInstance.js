import axios from "axios";

// create a axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/admin/',
  
   
});

export default axiosInstance;