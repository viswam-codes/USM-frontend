import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
  allowedRole: "user" | "admin";
}

const ProtectedRoute = ({ children, redirectPath = "/login", allowedRole }: ProtectedRouteProps) => {
  const userToken = localStorage.getItem('userToken');  // Get user token from localStorage
  const adminToken = localStorage.getItem('adminToken');  // Get admin token from localStorage

  // Check if the user or admin is logged in
  if (allowedRole === "user" && !userToken) {
    return <Navigate to={redirectPath} />; // Redirect to login if user not logged in
  }

  if (allowedRole === "admin" && !adminToken) {
    return <Navigate to="/adminLogin" />; // Redirect to admin login if admin not logged in
  }

  return children; // Render children if access is allowed
};

export default ProtectedRoute;
