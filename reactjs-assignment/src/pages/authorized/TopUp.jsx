import React from "react";
import { HeaderWeb } from "../../components/HeaderWeb";
import { UserData } from "../../components/UserData";

export const TopUp = () => {
  return (
    <>
      <HeaderWeb />
      <main style={{ marginTop: "95px" }}>
        <UserData />
      </main>
    </>
  );
};
