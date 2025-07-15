import { createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/auth/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <div>Register</div>,
      },
    ],
  },
]);

export default router;
