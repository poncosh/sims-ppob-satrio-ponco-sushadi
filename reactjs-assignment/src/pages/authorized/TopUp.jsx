import React from "react";
import { HeaderWeb } from "../../components/HeaderWeb";
import { UserData } from "../../components/UserData";
import { Navigate } from "react-router-dom";

export const TopUp = () => {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <HeaderWeb />
      <main style={{ marginTop: "95px" }}>
        <UserData />
      </main>
    </>
  );
};
