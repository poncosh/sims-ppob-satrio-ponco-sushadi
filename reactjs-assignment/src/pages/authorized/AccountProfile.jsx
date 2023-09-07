import React, { useRef, useState } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate } from "react-router-dom";
import profilePhoto from "../../assets/img/Profile Photo.png";
import { HeaderWeb } from "../../components/HeaderWeb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { CropEasy } from "../../components/crop/CropEasy";

export const AccountProfile = () => {
  const imageRef = useRef();
  const modalRef = useRef();
  const { fullName, authState, onUpdatePicture } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [edit, setEditProfile] = useState(false);

  const onImageSelected = async (event) => {
    const imageFile = event.target.files[0];
    setPhotoUrl(URL.createObjectURL(imageFile));
    modalRef.current.click();
    imageRef.current.value = "";
  };

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <HeaderWeb />
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <div className="container d-flex flex-column align-items-center">
          <div className="d-flex flex-column mt-3 align-items-center">
            <div
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                backgroundImage:
                  authState.user?.profile_image?.split("/")[4] === "null"
                    ? `url('${profilePhoto}')`
                    : `url('${authState.user?.profile_image}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <input
                onChange={onImageSelected}
                ref={imageRef}
                style={{ display: "none" }}
                type="file"
              />
              <div
                onClick={() => imageRef.current.click()}
                id="picture-edit"
                className="w-100 h-100 rounded-circle bg-secondary d-flex align-items-center justify-content-center"
              >
                <FontAwesomeIcon icon={faPen} width="15px" color="#FFFFFF" />
              </div>
            </div>

            <p
              className="mt-3 mb-0 text-center"
              style={{ fontSize: "1.8rem", fontWeight: "700" }}
            >
              {fullName}
            </p>
          </div>
        </div>
      </main>
      <button
        ref={modalRef}
        data-bs-toggle="modal"
        data-bs-target="#modal-add"
        style={{ display: "none" }}
      />
      <CropEasy photoUrl={photoUrl} />
    </>
  );
};
