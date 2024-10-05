/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiMail, FiLock } from "react-icons/fi";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch,RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAdmin } from "../../redux/features/adminSlice";
import * as yup from "yup"

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



const AdminLogin = () => {
  //dispatch
  const dispatch = useDispatch<AppDispatch>();
  const {loading,error}=useSelector(
    (state:RootState)=>state.admin
  )
  //navigate()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //onsubmit
  const onSubmit= async(data:any)=>{
    const result = await dispatch(loginAdmin(data));

    if(loginAdmin.fulfilled.match(result)){
      navigate("/dashboard")
    }
  }

  return (
    <div>
      <div className="adminlog-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="adminput-container">
            <FiMail className="icon" />
            <input type="email" placeholder="Email" {...register("email")} />
            </div>

            <div className="adminput-container">
            <FiLock className="icon" />
            <input type="password"
            placeholder="Password"
            {...register("password")}
            />
             {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            <button>{loading ? "Registering..." : "Login"}</button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
