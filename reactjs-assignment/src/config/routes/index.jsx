import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegisterPage } from "../../pages/unauthorized";
import { Layout } from "../../components/Layout";
import { HomePage, TopUp } from "../../pages/authorized";

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
      {
        path: "/top-up",
        element: <TopUp />,
      },
    ],
  },
]);
