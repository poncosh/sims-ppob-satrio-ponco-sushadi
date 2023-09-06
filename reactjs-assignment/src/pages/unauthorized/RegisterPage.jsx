import React, { useState } from "react";
import { useAuth } from "../../stores/auth/context";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingComponent } from "../../components/LoadingComponent";
import simsLogo from "../../assets/img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Illustration } from "../../components/Illustration";
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

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { authState, onRegister } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    password_confirm: "",
  });
  const [errorInput, setError] = useState({
    condition: false,
    message: "",
  });
  const loading = useSelector((state) => state.content.isLoading);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitRegister = async () => {
    if (data.password === "") {
      return setError({
        condition: true,
        message: "Password tidak boleh kosong",
      });
    }
    if (data.password < 8) {
      return setError({
        condition: true,
        message: "Password harus lebih panjang dari 8 karakter",
      });
    }
    if (data.password !== data.password_confirm) {
      return setError({
        condition: true,
        message: "Password tidak sesuai",
      });
    }
    const result = await onRegister(data);
    if (result && result.error) {
      return setError({
        condition: true,
        message: result.msg,
      });
    }
    await Toast.fire({
      icon: "success",
      title: "Success register",
    });
    return navigate("/login");
  };

  if (authState?.authenticated) {
    return <Navigate to="/" replace />;
  }
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <main
      className="d-flex flex-row"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="d-flex flex-column bg-lighttheme justify-content-center align-items-center"
        style={{ flex: 1 }}
      >
        <div className="d-flex flex-column align-items-center text-center w-100 mb-3">
          <div className="d-flex flex-row align-items-center mb-3">
            <img
              src={simsLogo}
              style={{ width: "30px", height: "30px", marginInline: "3px" }}
            />
            <p
              style={{
                fontSize: "1.7rem",
                padding: 0,
                margin: 0,
                fontWeight: "600",
                marginInline: "3px",
              }}
            >
              SIMS PPOB
            </p>
          </div>
          <div style={{ width: "65%" }}>
            <p style={{ fontSize: "1.9rem", fontWeight: "700" }}>
              Lengkapi data untuk membuat akun
            </p>
          </div>
        </div>
        <div className="d-flex flex-column w-75 align-items-center text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitRegister();
            }}
            className="d-flex align-items-center flex-column w-100"
          >
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="email-login"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faAt} />
              </span>
              <input
                aria-describedby="email-login"
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
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="firstname-login"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                aria-describedby="firstname-login"
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
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="lastname-login"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                aria-describedby="lastname-login"
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
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="password-login"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon
                  color={
                    errorInput.condition === true && data.password === ""
                      ? "#f42619"
                      : errorInput.condition === true &&
                        errorInput.message ===
                          "Password harus lebih panjang dari 8 karakter" &&
                        data.password.length < 8
                      ? "#f42619"
                      : errorInput.condition === true &&
                        errorInput.message === "Password tidak sesuai"
                      ? "#f42619"
                      : "black"
                  }
                  icon={faLock}
                />
              </span>
              <input
                aria-describedby="password-login"
                className="p-2 rounded-end form-control"
                type="password"
                name="password"
                placeholder="buat password"
                onChange={handleInput}
                value={data.password}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border:
                    errorInput.condition === true && data.password === ""
                      ? "solid 1px #f42619"
                      : errorInput.condition === true &&
                        errorInput.message ===
                          "Password harus lebih panjang dari 8 karakter" &&
                        data.password.length < 8
                      ? "solid 1px #f42619"
                      : errorInput.condition === true &&
                        errorInput.message === "Password tidak sesuai"
                      ? "solid 1px #f42619"
                      : "solid 1px grey",
                  color: data.password === "" ? "grey" : "black",
                }}
              />
            </div>
            <div className="input-group w-75 d-flex align-items-center">
              <span
                className="input-group-text"
                id="passwordconfirm-login"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon
                  color={
                    errorInput.condition === true &&
                    errorInput.message === "Password tidak sesuai"
                      ? "#f42619"
                      : "black"
                  }
                  icon={faLock}
                />
              </span>
              <input
                aria-describedby="passwordconfirm-login"
                className="p-2 rounded-end form-control"
                type="password"
                name="password_confirm"
                placeholder="konfirmasi password"
                onChange={handleInput}
                value={data.password_confirm}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border:
                    errorInput.condition === true &&
                    errorInput.message === "Password tidak sesuai"
                      ? "solid 1px #f42619"
                      : "solid 1px grey",
                  color: data.password_confirm === "" ? "grey" : "black",
                }}
              />
            </div>
            {errorInput.condition && (
              <p className="text-secondtheme text-end">{errorInput.message}</p>
            )}
            <button
              className="btn btn-secondtheme text-light w-75 p-2 rounded text-center"
              type="submit"
              style={{ marginTop: "50px" }}
            >
              Register
            </button>
          </form>
          <p
            style={{ color: "GrayText", fontWeight: "600", marginTop: "20px" }}
          >
            Sudah punya akun? login{" "}
            <span
              id="navigation-id"
              className="text-secondtheme"
              onClick={() => navigate("/login")}
            >
              di sini
            </span>
          </p>
        </div>
      </div>
      <Illustration />
    </main>
  );
};
