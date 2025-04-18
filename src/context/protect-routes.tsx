import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth-context";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/" replace />; // ✅ Prevent redirection until auth state is confirmed
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
