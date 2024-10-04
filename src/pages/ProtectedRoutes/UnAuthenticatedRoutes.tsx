import { Navigate } from "react-router-dom";

interface UnauthenticatedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const UnauthenticatedRoute = ({ children, redirectPath = "/home" }: UnauthenticatedRouteProps) => {
  const token = localStorage.getItem('token');  // Check token from localStorage

  // If the user is logged in, redirect to home
  return token ? <Navigate to={redirectPath} /> : children;
};

export default UnauthenticatedRoute;
