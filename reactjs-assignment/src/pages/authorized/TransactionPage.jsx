import React, { useEffect, useId } from "react";
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
    document.title = "SIMS - PPOB | Transaksi";
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
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "February",
    },
    {
      id: 3,
      name: "March",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "May",
    },
    {
      id: 6,
      name: "June",
    },
    {
      id: 7,
      name: "July",
    },
    {
      id: 8,
      name: "August",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "October",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
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
                key={month.id}
                id="navigation-id"
                onClick={() =>
                  navigate(`/transaction/${month.name.toLowerCase()}`)
                }
                className="m-0 col-4 col-md-3 col-lg-1 rounded-top text-center pt-2 pb-2"
                style={{
                  fontWeight:
                    monthLocation === month.name.toLowerCase() ? "700" : "400",
                  backgroundColor:
                    monthLocation === month.name.toLowerCase()
                      ? "#D7CABF"
                      : "white",
                }}
              >
                {month.name}
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
