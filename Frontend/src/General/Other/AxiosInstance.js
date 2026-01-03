import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // or process.env.REACT_APP_API_BASE_URL
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true, // only if using cookies/auth
});

export default axiosInstance;
