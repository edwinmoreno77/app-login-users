import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { Users } from "../pages/Users";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

// public routes
const publicRoutes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterForm />
      </PublicRoute>
    ),
  },
];

// protected routes
const protectedRoutes = [
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
];

// default route
const defaultRoute = {
  path: "/",
  element: <Navigate to="/login" replace />,
};

// combine all routes
const routes = [...publicRoutes, ...protectedRoutes, defaultRoute];

// create the router
export const router = createBrowserRouter(routes);
