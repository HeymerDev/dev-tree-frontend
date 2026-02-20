import { createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/app/Profile";
import LinkTree from "./pages/app/LinkTree";
import { PublicView } from "./pages/publics/Profile";
import { NotFound } from "./pages/publics/NotFound";
import { Home } from "./pages/publics/Home";
import PublicLayout from "./layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LinkTree />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/:handle",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <PublicView />,
      },
    ],
  },
  {
    path: "/404",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
