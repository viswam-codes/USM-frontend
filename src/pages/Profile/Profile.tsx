import React from 'react';
import './Profile.css';
import { useSelector,useDispatch } from 'react-redux'; // Import your CSS file for styling
import { RootState } from '../../redux/store';

const Profile = () => {
    const {user}=useSelector((state:RootState)=>state.user)
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="image-container">
          <img
          src={user?.image}
          />
          <button className="change-btn">Change</button>
        </div>
        <form className="profile-form">
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <button className="save-btn" type="submit">Save Changes</button>
          <button className="save-btn" type="submit">Home</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
