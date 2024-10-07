/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./EditModal.css"; // For styling

interface EditUserComponentProps {
  user: any; // Define your User type
  onSubmit: (formData: FormData) => void;
  onCancel: () => void; // Call this when the user cancels the editing
}

const EditUserComponent: React.FC<EditUserComponentProps> = ({ user,onSubmit, onCancel }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user?.image || null);

  // Sync component state with user prop when user changes
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPreviewImage(user?.image || null);
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("id", user._id); 
    if (image) {
      formData.append("image", image);
    }
    console.log(formData.get("id"));
    onSubmit(formData);
  };

  

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="image-container">
          <img src={previewImage || ""} alt="User Profile" />
          <button className="change-btn-mdl" type="button">
            <label>
              Change
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </button>
        </div>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserComponent;
