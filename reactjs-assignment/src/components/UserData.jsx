import React, { useState } from "react";
import { useAuth } from "../stores/auth/context";
import profilePhoto from "../assets/img/Profile Photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const UserData = () => {
  const { fullName, authState } = useAuth();

  const [isEye, setEye] = useState(false);

  const profilePicture = authState.user?.profile_image?.split("/")[4];
  const balanceFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(authState.balance);

  return (
    <div className="container">
      <div className="row p-4">
        <div className="col-5 p-2">
          <img
            className="rounded-circle"
            src={
              profilePicture === "null"
                ? profilePhoto
                : authState.user?.profile_image
            }
            style={{ width: "70px" }}
          />
          <p className="mt-3 mb-0 p-0">Selamat datang,</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>{fullName}</p>
        </div>
        <div className="col-7 p-4 rounded-4 bg-secondtheme text-light">
          <p className="mb-2">Saldo anda</p>
          <p className="mb-2" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
            {!isEye ? "Rp *******" : balanceFormatted}
          </p>
          <div className="d-flex flex-row align-items-center">
            <p className="mb-0 me-3">Lihat saldo</p>
            <FontAwesomeIcon
              onClick={() => setEye(!isEye)}
              icon={!isEye ? faEye : faEyeSlash}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
