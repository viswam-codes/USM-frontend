import { Routes, Route } from "react-router-dom";
import LoginContainer from "./pages/Login/LoginContainer";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoutes";
import UnauthenticatedRoute from "./pages/ProtectedRoutes/UnAuthenticatedRoutes";
import AdminUnauthenticatedRoute from "./pages/ProtectedRoutes/AdminUnAuthenticatedRoute";
import Profile from "./pages/Profile/Profile";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <LoginContainer />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedRoute>
              <Signup />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRole="user">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="user">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <AdminUnauthenticatedRoute>
              <AdminLogin />
            </AdminUnauthenticatedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
