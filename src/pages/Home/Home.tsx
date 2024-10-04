import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store"
import { useSelector,useDispatch } from "react-redux"
import "./home.css"
import { logout } from "../../redux/features/userSlice";
import axios from "axios";

const Home = () => {
    const {user} = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const handleLogOut = async () => {
        try {
            console.log("Reaching")
          // Make an API call to the backend to clear the cookie
         await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
    
          // Dispatch logout action to clear the Redux state
          dispatch(logout());
    
          navigate("/login");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };


  return (
    <div className="home-container">
        <div className="home-box">
        <div className="image-container">
            <img src={user?.image}/>
            </div>
            <div className="heading-tag">
            <h1>Welcome {user?.name}</h1>
            </div>
           <div className="button-container">
           <button onClick={handleLogOut}>LogOut</button>
           <button>Edit Profile</button>
           </div>
        </div>
    </div>
  )
}

export default Home