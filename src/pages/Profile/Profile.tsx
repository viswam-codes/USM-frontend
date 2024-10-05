import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux"; // Import your CSS file for styling
import { RootState,useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { updateUserDetails } from "../../redux/features/userSlice";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch()

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user?.image || null);


  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if(file){
      setImage(file);
      const imageUrl=URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(formData)
    formData.append("name",name);
    formData.append("email",email);
    if(image){
      formData.append('image',image);
    }
     console.log(user?._id)

    const userId = user?._id;

    if (userId) {
      dispatch(updateUserDetails({ id: userId, formData }));
    } else {
      console.error("User ID is undefined");
      // Handle the case where userId is undefined, e.g., show an error message
    }

  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="image-container">
        <img src={previewImage || ''} alt="User Profile" />
        <button  className="change-btn"> <label>
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label></button>
         
        </div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <button className="save-btn" type="submit">
            Save Changes
          </button>
          <Link to="/home">
            <button className="save-btn" type="submit">
              Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
