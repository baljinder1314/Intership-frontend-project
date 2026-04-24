import React from "react";
import Signup from "../pages/form/signup/Signup";
import Home from "../pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "../pages/form/login/Login";
import Layout from "../components/layout/Layout";
import User from "../components/User";
import UserEdit from "../pages/EditUser";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  return token || undefined ? <Outlet /> : <Navigate to="/signup" />;
};

const PublicLayout = () => {
  const token = localStorage.getItem("token");
  return !token || undefined ? <Outlet /> : <Navigate to="/" />;
};

// ✅ createBrowserRouter with layout wrapping
const router = createBrowserRouter([
  {
    // Protected routes
    element: <ProtectedLayout />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/edit",
            element: <UserEdit />,
          },
        ],
      },

      // add more protected routes here
      // { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {
    // Public routes
    element: <PublicLayout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    // 404
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
