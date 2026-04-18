import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }: { requiredRole: "admin" | "doctor" }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/auth/login" replace />;

  if (role && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/admin/overview" : "/doctor/overview"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
