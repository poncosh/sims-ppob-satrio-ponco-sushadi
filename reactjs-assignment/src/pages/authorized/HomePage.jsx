import React from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <div>HomePage</div>;
};
