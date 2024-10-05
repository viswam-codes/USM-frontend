import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
  allowedRole?: string;
}

const ProtectedRoute = ({ children, redirectPath = "/login", allowedRole }: ProtectedRouteProps) => {
  const { token, user } = useSelector((state: RootState) => state.user);

  // Check if token exists
  if (!token) {
    // Check if the route is for an admin or a user and redirect accordingly
    return allowedRole === "admin" ? <Navigate to="/adminLogin" /> : <Navigate to={redirectPath} />;
  }

  // Check if the user role matches the allowedRole
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={allowedRole === "admin" ? "/adminLogin" : "/login"} />;
  }

  return children;
};

export default ProtectedRoute;
