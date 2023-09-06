import React, { useState } from "react";
import { useAuth } from "../../stores/auth/context";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingComponent } from "../../components/LoadingComponent";
import simsLogo from "../../assets/img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
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

export const LoginPage = () => {
  const navigate = useNavigate();
  const { authState, onLogin } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
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

  const submitLogin = async () => {
    if (data.password === "") {
      return setError({
        condition: true,
        message: "Password tidak boleh kosong",
      });
    }
    if (data.password.length < 8) {
      return setError({
        condition: true,
        message: "Password harus lebih panjang dari 8 karakter",
      });
    }
    const result = await onLogin(data);
    if (result && result.error) {
      return setError({
        condition: true,
        message: result.msg,
      });
    }
    await Toast.fire({
      icon: "success",
      title: "Success Login",
    });
    return navigate("/");
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
              Masuk atau buat akun untuk memulai
            </p>
          </div>
        </div>
        <div className="d-flex flex-column w-75 align-items-center text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitLogin();
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
                        errorInput.message === "Username atau password salah"
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
                placeholder="masukkan password anda"
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
                        errorInput.message === "Username atau password salah"
                      ? "solid 1px #f42619"
                      : "solid 1px grey",
                  color: data.password === "" ? "grey" : "black",
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
              Masuk
            </button>
          </form>
          <p
            style={{ color: "GrayText", fontWeight: "600", marginTop: "20px" }}
          >
            Belum punya akun? registrasi{" "}
            <span
              id="navigation-id"
              className="text-secondtheme"
              onClick={() => navigate("/registration")}
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
