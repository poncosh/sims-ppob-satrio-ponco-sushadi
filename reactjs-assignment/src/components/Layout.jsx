import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderWeb } from "./HeaderWeb";

export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
