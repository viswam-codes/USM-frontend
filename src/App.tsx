import { Routes, Route } from "react-router-dom";
import LoginContainer from "./pages/Login/LoginContainer";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoutes";
import UnauthenticatedRoute from "./pages/ProtectedRoutes/UnAuthenticatedRoutes";
import Profile from "./pages/Profile/Profile";

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
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
