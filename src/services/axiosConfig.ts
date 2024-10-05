import axios from "axios";
import { logout } from "../redux/features/userSlice";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom"; // Import the logout action
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
    console.log("reaching")
     console.log(error.response.status)
    
      // Handle 401 Unauthorized response
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        store.dispatch(logout())

        // Optionally redirect to login page
        window.location.href = "/login";
      }
  
    return Promise.reject(error); 
  }
);

export default axiosInstance;
