// ProtectedRoutes/AuthenticatedRoutes.tsx


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const AuthenticatedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default AuthenticatedRoute;
