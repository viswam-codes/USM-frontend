/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import EditUserComponent from "../EditUser/EditUserComponent";
import {
  adminLogout,
  fetchUsers,
  setSearchQuery,
  selectSearchQuery,
  updateUser,
  deleteUser
} from "../../redux/features/adminSlice";
import axios from "axios";
import { useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useSelector((state: RootState) => state.admin.filteredUsers);
  const error = useSelector((state: RootState) => state.admin.error);
  const searchQuery = useSelector(selectSearchQuery);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Dispatch fetchUsers when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //User editing component handlers

  const handleCancelEdit = () => {
    setSelectedUser(null); // Clear the selected user and close the EditUserComponent
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
  };

  const handleEditUserSubmit = async (updatedUser: any) => {
    try {
      const resultAction = await dispatch(updateUser(updatedUser));

      if (updateUser.fulfilled.match(resultAction)) {
        setSelectedUser(null);
      } else {
        console.error(
          "Update failed:",
          resultAction.payload || resultAction.error.message
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //deleting user handling

  const handleDelete=async (userId:string)=>{
    console.log(userId);
    try{
      const resultAction = await dispatch(deleteUser(userId));
      if(deleteUser.fulfilled.match(resultAction)){
        console.log("User deleted succesfully");
      }else{
        console.log(error,"Delete Failed:",resultAction.error.message);
      }
    }catch(error){
      console.log(error)
    }
  }

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <button onClick={handleLogOut} className="admin-logout-button">
        Log Out
      </button>

      <div className="admin-search-container">
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="admin-card-grid">
        {users.length === 0 && searchQuery ? (
          <p className="no-results">No users found matching your search.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="admin-card">
              <div className="admin-card-info">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="admin-user-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      // e.currentTarget.nextSibling?.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className="admin-user-image-container">
                    {getInitials(user.name)}
                  </div>
                )}
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
              </div>
              <div className="admin-button-container">
                <button
                  className="admin-edit-button"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button className="admin-delete-button" onClick={()=>handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditUserComponent
              user={selectedUser}
              onSubmit={handleEditUserSubmit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
