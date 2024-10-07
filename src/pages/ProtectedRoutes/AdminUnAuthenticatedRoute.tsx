import { Navigate } from "react-router-dom";

interface AdminUnauthenticatedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const AdminUnauthenticatedRoute = ({ children, redirectPath = "/admin/dashboard" }: AdminUnauthenticatedRouteProps) => {
  const adminRole = localStorage.getItem('adminRole');  // Get admin role from localStorage

  // If the admin is already logged in, redirect them
  if (adminRole) {
    return <Navigate to={redirectPath} />;  // Redirect admin to dashboard if logged in
  }

  // If no admin is logged in, render the children
  return children;
};

export default AdminUnauthenticatedRoute;
