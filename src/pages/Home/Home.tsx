import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import { logout } from "../../redux/features/userSlice";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import axios from "axios";


const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogOut = async () => {
    console.log("logout")
    try {
      await axiosInstance.post(
        "/logout",
        {},
        { withCredentials: true }
      );

     const res= dispatch(logout());

     if(res) {
      navigate("/login");
    }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <div className="image-container">
          <img src={user?.image} />
        </div>
        <div className="heading-tag">
          <h1>Welcome {user?.name}</h1>
        </div>
        <div className="button-container">
          <button onClick={handleLogOut}>LogOut</button>
          <Link to="/profile"><button> Profile</button></Link>
        </div>
     
      </div>

    </div>
  
  );
};

export default Home;
