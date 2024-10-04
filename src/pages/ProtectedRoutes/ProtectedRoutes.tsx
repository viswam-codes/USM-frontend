import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const ProtectedRoute = ({ children, redirectPath = "/home" }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  // If user is logged in, redirect to the specified path (e.g., /home)
  if (user) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
