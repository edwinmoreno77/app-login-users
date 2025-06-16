import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ProtectedRouteProps } from "../../types/components";

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
