import React from "react";
import {  useSelector } from "react-redux";
import { RootState,useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  adminLogout,
  fetchUsers,
  selectAdminUsers,
} from "../../redux/features/adminSlice";
import axios from "axios";
import { useEffect } from "react";
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectAdminUsers);
  const loading = useSelector((state: RootState) => state.admin.loading);
  const error = useSelector((state: RootState) => state.admin.error);

  useEffect(() => {
    // Dispatch fetchUsers when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);


  const handleLogOut = async () => {
    console.log("logout");
    try {
      await axios.post(
        "http://localhost:3000/admin/logout",
        {},
        { withCredentials: true }
      );

      const res = dispatch(adminLogout());

      if (res) {
        navigate("/adminLogin");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <button onClick={handleLogOut} className="admin-logout-button">Log Out</button>
      
      <div className="admin-search-container">
        <input 
          type="text" 
          className="admin-search-input" 
          placeholder="Search users by name or email..."
          onChange={(e) => {/* Add your search logic here */}}
        />
      </div>
  
      <div className="admin-card-grid">
        {users.map((user) => (
          <div key={user._id} className="admin-card">
            <div className="admin-card-info">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
            </div>
            <div className="admin-button-container">
              <button className="admin-edit-button">
                Edit
              </button>
              <button className="admin-delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
