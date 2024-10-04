/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiMail, FiLock } from "react-icons/fi";
import "./login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser } from "../../redux/features/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user, token } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
    navigate("/home");
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {user && <p className="success-message">Loggen in!</p>}

            {/* Email Input */}
            <div className="input-container">
              <FiMail className="icon" />
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email")} // Connect input with react-hook-form
              />
              {/* Display validation error for email */}
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="input-container">
              <FiLock className="icon" />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password")} // Connect input with react-hook-form
              />
              {/* Display validation error for password */}
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button>{loading ? "Registering..." : "Login"}</button>

            {/* Sign Up Link */}
            <p>
              or{" "}
              <span className="signup-link">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;
