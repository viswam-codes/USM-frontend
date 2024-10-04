import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const ProtectedRoute = ({ children, redirectPath = "/login" }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');  // Check token from localStorage

  // If the user is not logged in, redirect to login
  return token ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
