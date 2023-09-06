import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegisterPage } from "../../pages/unauthorized";
import { Layout } from "../../components/Layout";
import { useAuth } from "../../stores/auth/context";
import { HomePage } from "../../pages/authorized";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegisterPage />,
      },
    ],
  },
]);