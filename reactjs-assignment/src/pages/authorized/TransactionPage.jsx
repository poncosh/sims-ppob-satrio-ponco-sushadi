import React, { useEffect } from "react";
import { useAuth } from "../../stores/auth/context";
import { UserData } from "../../components/UserData";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HeaderWeb } from "../../components/HeaderWeb";
import { LoadingComponent } from "../../components/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../../stores/contents/reducers/contentReducer";

export const TransactionPage = () => {
  const { pathname } = useLocation();
  const { authState } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.content.isLoading);
  const transaction = useSelector((state) => state.content.userTransaction);
  const monthLocation = pathname.split("/")[2];

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  const data = transaction.map((el) => ({
    ...el,
    created_on: new Date(el.created_on).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <HeaderWeb />
      <main style={{ marginTop: "95px" }}>
        <UserData />

        <div className="container">
          <p
            className="ps-3 mb-3"
            style={{ fontSize: "1.4rem", fontWeight: "600" }}
          >
            Semua Transaksi
          </p>
          <div className="row">
            {months.map((month) => (
              <p
                id="navigation-id"
                onClick={() => navigate(`/transaction/${month.toLowerCase()}`)}
                className="m-0 col-1 rounded-top text-center pt-2 pb-2"
                style={{
                  fontWeight:
                    monthLocation === month.toLowerCase() ? "700" : "400",
                  backgroundColor:
                    monthLocation === month.toLowerCase() ? "#D7CABF" : "white",
                }}
              >
                {month}
              </p>
            ))}
          </div>
        </div>
        <div className="container d-flex flex-column">
          <Outlet context={[data]} />
        </div>
      </main>
    </>
  );
};
