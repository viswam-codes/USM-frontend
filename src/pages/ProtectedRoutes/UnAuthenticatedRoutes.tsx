import { Navigate } from "react-router-dom";

interface UnauthenticatedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const UnauthenticatedRoute = ({ children, redirectPath = "/home" }: UnauthenticatedRouteProps) => {
  const user = localStorage.getItem('user');  

 
  if (user) {
    return <Navigate to={redirectPath} />;  
  }

  
  return children;
};

export default UnauthenticatedRoute;
