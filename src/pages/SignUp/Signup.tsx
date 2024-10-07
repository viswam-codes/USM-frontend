/* eslint-disable @typescript-eslint/no-explicit-any */
import "./signUp.css";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/userSlice";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi"; // Example of importing icons
import { RootState, AppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  image: Yup.mixed().required("Profile image is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user  } = useSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //form Submission
  const onSubmit = (formData: any) => {
    // Prepare data to send
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);

    if (formData.image && formData.image.length > 0) {
      data.append("image", formData.image[0]);
    } else if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else {
      console.log("No image file found");
    }

    // Dispatch action for registering the user
    dispatch(registerUser(data)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate("/login");
      }
    });
    console.log(data);
  };


  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="signup-form">
          <h2>Sign Up</h2>

          <div className="input-container">
            <FiUser className="icon" />
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")} // Use register to track this input field
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className="input-container">
            <FiMail className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")} // Use register to track this input field
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input-container">
            <FiLock className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")} // Use register to track this input field
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="input-container">
            <FiLock className="icon" />
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")} // Use register to track this input field
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <label htmlFor="image-upload" className="image-label">
            <FiImage className="icon" /> Upload Profile Image
          </label>
          <input
            type="file"
            id="image-upload"
            className="image-upload"
            accept="image/*"
            {...register("image")} // Use register for file input
          />
          {errors.image && (
            <p className="error-message">{errors.image.message}</p>
          )}
          <label htmlFor="image-upload" className="custom-upload-btn">
            Choose File
          </label>

          <button className="signup-btn">
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <p>
              or{" "}
              <span className="login-link">
              <Link to="/login">Sign In</Link>
              </span>
              </p>
        </div>
       
        {error && <p className="error-message">{error}</p>}
        {user && <p className="success-message">Registration successful!</p>}
      </form>
    </div>
  );
};

export default Signup;
