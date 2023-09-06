import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/main.css";
import "bootstrap/dist/js/bootstrap.js";
import { AuthProvider } from "./stores/auth/context";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores";
import { router } from "./config/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
