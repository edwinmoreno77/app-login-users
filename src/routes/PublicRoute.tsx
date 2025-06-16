import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { PublicRouteProps } from "../types/components";

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return <>{children}</>;
};
