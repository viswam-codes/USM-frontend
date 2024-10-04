import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice"; // Import the logout action
// If you have a refresh token function, you can import it here as well

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Axios interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const dispatch = useDispatch();
    if (error.response) {
      // Handle 401 Unauthorized response
      if (error.response.status === 401) {
        alert(error.response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout())

        // Optionally redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error); 
);

export default axiosInstance;
