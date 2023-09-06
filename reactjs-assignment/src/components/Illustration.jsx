import React from "react";
import loginIlustration from "../assets/img/Illustrasi Login.png";

export const Illustration = () => {
  return (
    <div className="bg-dark" style={{ flex: 1 }}>
      <img
        src={loginIlustration}
        className="h-100 w-100"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
