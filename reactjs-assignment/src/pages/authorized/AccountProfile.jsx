import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate } from "react-router-dom";
import profilePhoto from "../../assets/img/Profile Photo.png";
import { HeaderWeb } from "../../components/HeaderWeb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { CropEasy } from "../../components/crop/CropEasy";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const AccountProfile = () => {
  const imageRef = useRef();
  const modalRef = useRef();
  const { fullName, authState, onUpdateProfile, onLogout } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [edit, setEditProfile] = useState(false);
  const [errorInput, setError] = useState({
    condition: false,
    message: "",
  });
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    setData({
      email: authState.user?.email,
      first_name: authState.user?.first_name,
      last_name: authState.user?.last_name,
    });
    document.title = "SIMS - PPOB | Akun";
  }, []);

  const onImageSelected = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile.size > 100000) {
      return Swal.fire({
        icon: "error",
        title: "Gagal upload foto profil",
        text: "Foto profil melebihi 100kb, mohon gunakan file dibawah 100kb",
      });
    } else if (
      imageFile.type !== "image/jpeg" &&
      imageFile.type !== "image/png"
    ) {
      return Swal.fire({
        icon: "error",
        title: "Gagal upload foto profil",
        text: "Format gambar yang diterima adalah JPG dan PNG",
      });
    }
    setPhotoUrl(URL.createObjectURL(imageFile));
    modalRef.current.click();
    imageRef.current.value = "";
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const result = await onUpdateProfile(data);
    if (result && result.error) {
      return setError({
        condition: true,
        message: result.msg,
      });
    }
    setEditProfile(!edit);
    await Toast.fire({
      icon: "success",
      title: "Success edit profile",
    });
  };

  const handleInput = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
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
                border: "solid 1px grey",
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
          {errorInput.condition && (
            <div
              className="w-75 alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ada input salah!</strong> Cek lagi data yang kamu input
              <button
                type="button"
                className="float-end btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form
            onSubmit={updateProfile}
            className="d-flex align-items-center flex-column w-100"
          >
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="email-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faAt} />
              </span>
              <input
                aria-describedby="email-edit"
                className="p-2 rounded-end form-control"
                type="email"
                name="email"
                placeholder="masukkan email anda"
                onChange={handleInput}
                value={data.email}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.email === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="firstname-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                aria-describedby="firstname-edit"
                className="p-2 rounded-end form-control"
                type="text"
                name="first_name"
                placeholder="nama depan"
                onChange={handleInput}
                value={data.first_name}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.first_name === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="lastname-edit"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                aria-describedby="lastname-edit"
                className="p-2 rounded-end form-control"
                type="text"
                name="last_name"
                placeholder="nama belakang"
                onChange={handleInput}
                value={data.last_name}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px grey",
                  color: data.last_name === "" ? "grey" : "black",
                }}
                disabled={!edit ? true : false}
              />
            </div>
            <button
              style={{ display: !edit ? "none" : "block" }}
              type="submit"
              className="btn btn-secondtheme text-light w-75"
            >
              Simpan
            </button>
          </form>
          <button
            onClick={() => setEditProfile(!edit)}
            style={{ display: !edit ? "block" : "none" }}
            className="btn btn-secondtheme text-light w-75 mb-3"
          >
            Edit Profil
          </button>
          <button
            onClick={() => onLogout()}
            style={{ display: !edit ? "block" : "none" }}
            className="btn btn-outline-secondtheme w-75"
          >
            Logout
          </button>
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
