import React from "react";
import { useAuth } from "../../stores/auth/context";
import { HeaderWeb } from "../../components/HeaderWeb";
import { UserData } from "../../components/UserData";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import simsLogo from "../../assets/img/Logo.png";
import Swal from "sweetalert2";

export const PaymentPage = () => {
  const { authState, onTransaction } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const services = useSelector((state) => state.content.services);
  const data = services.filter((el) => el.service_code === slug)[0];

  const submitTransaction = () => {
    Swal.fire({
      title: `Bayar ${data.service_name} senilai ${new Intl.NumberFormat(
        "id-ID",
        {
          style: "currency",
          currency: "IDR",
        }
      ).format(data.service_tariff)}?`,
      iconHtml: `<img src=${simsLogo} width=60 />`,
      customClass: {
        icon: "no-border",
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan bayar",
      cancelButtonText: "Batalkan",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payment = await onTransaction(data.service_code);
        if (payment && payment.error) {
          return Swal.fire({
            icon: "error",
            title: `Pembelian sebesar ${new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.service_tariff)}`,
            text: "Gagal",
            confirmButtonText: "Kembali ke beranda",
          }).then(() => navigate("/"));
        }
        Swal.fire({
          icon: "success",
          title: `Pembelian sebesar ${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.service_tariff)}`,
          text: "Sukses",
          confirmButtonText: "Kembali ke beranda",
        }).then(() => navigate("/"));
      }
    });
  };

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <HeaderWeb />
      <main style={{ marginTop: "95px" }}>
        <UserData />
        <div className="container d-flex flex-column">
          <p>Pembayaran</p>
          <div className="d-flex flex-row align-items-center">
            <img
              className="rounded-circle"
              src={data.service_icon}
              style={{ width: "42px" }}
            />
            <p
              className="mb-0 ms-3"
              style={{ fontSize: "1.2rem", fontWeight: "600" }}
            >
              {data.service_name}
            </p>
          </div>
          <form
            id="payment-form"
            className="d-flex flex-column w-100 mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              submitTransaction();
            }}
          >
            <div className="input-group d-flex align-items-center w-100">
              <span
                className="input-group-text"
                id="amount-topup"
                style={{ height: "43px" }}
              >
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              <CurrencyInput
                aria-describedby="amount-topup"
                className="p-2 rounded-end form-control"
                name="amount"
                placeholder="masukkan nominal Top Up"
                value={data.service_tariff}
                decimalsLimit={2}
                disabled={true}
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  border: "solid 1px black",
                  color: "black",
                }}
              />
            </div>
            <button
              id="payment-submit"
              className="btn btn-secondtheme text-light p-2"
              type="submit"
            >
              Bayar
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
