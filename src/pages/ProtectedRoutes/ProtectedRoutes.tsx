import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
  allowedRole: "user" | "admin";
}

const ProtectedRoute = ({ children, redirectPath = "/login", allowedRole }: ProtectedRouteProps) => {
  const user = localStorage.getItem('user');  // Get user token from localStorage
  const admin = localStorage.getItem('admin');  // Get admin token from localStorage

  // Check if the user or admin is logged in
  if (allowedRole === "user" && !user) {
    return <Navigate to={redirectPath} />; // Redirect to login if user not logged in
  }

  if (allowedRole === "admin" && !admin) {
    return <Navigate to="/admin/login" />; // Redirect to admin login if admin not logged in
  }

  return children; // Render children if access is allowed
};

export default ProtectedRoute;
