import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you are using Redux
import { RootState } from "../../redux/store";

interface UnauthenticatedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const UnauthenticatedRoute = ({ children, redirectPath = "/home" }: UnauthenticatedRouteProps) => {
  const { token, user } = useSelector((state: RootState) => state.user);  // Get token and role from Redux

  // If the user is logged in
  if (token) {
    // Redirect based on the user's role
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" />;
    } else if (user?.role === "user") {
      return <Navigate to={redirectPath} />;  // Defaults to home
    }
  }

  // If not logged in, render the children
  return children;
};

export default UnauthenticatedRoute;
