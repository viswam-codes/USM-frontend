import { Routes, Route } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminUnauthenticatedRoute from "../ProtectedRoutes/AdminUnAuthenticatedRoute";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
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
  );
};

export default AdminRoutes;
