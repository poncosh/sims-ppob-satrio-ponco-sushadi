import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegisterPage } from "../../pages/unauthorized";
import { Layout } from "../../components/Layout";
import {
  AccountProfile,
  HomePage,
  PaymentPage,
  TopUp,
  TransactionPage,
} from "../../pages/authorized";
import { Transactions } from "../../components/TransactionMonth/Transactions";

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
      {
        path: "/payment/:slug",
        element: <PaymentPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
        children: [
          {
            path: "/transaction/:month",
            element: <Transactions />,
          },
        ],
      },
      {
        path: "/account",
        element: <AccountProfile />,
      },
    ],
  },
]);
