import React from 'react'
import axiosInstance from '../../services/axiosConfig';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../redux/features/adminSlice';
import axios from 'axios';


const AdminDashboard = () => {
const {admin}=useSelector((state:RootState)=>state.admin)
const dispatch=useDispatch();
const navigate = useNavigate();


  const handleLogOut = async () => {
    console.log("logout")
    try {
      await axios.post(
        "http://localhost:3000/admin/logout",
        {},
        { withCredentials: true }
      );

     const res= dispatch(adminLogout());

     if(res) {
      navigate("/adminLogin");
    }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    
    <div>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogOut} >Log Out</button>
    </div>
  )
}

export default AdminDashboard