import React, { useEffect } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate, useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../components/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { HeaderWeb } from "../../components/HeaderWeb";
import { UserData } from "../../components/UserData";
import {
  getBanner,
  getServices,
} from "../../stores/contents/reducers/contentReducer";
import { ServicesCard } from "../../components/ServicesCard";
import { GliderData } from "../../components/GliderData";

export const HomePage = () => {
  const { authState } = useAuth();
  const loading = useSelector((state) => state.content.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state) => state.content.services);
  const banners = useSelector((state) => state.content.banners);

  useEffect(() => {
    dispatch(getServices()).then(() => dispatch(getBanner()));
  }, [dispatch]);

  if (!authState?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  if (loading || services.length === 0 || banners.length === 0) {
    return <LoadingComponent />;
  }
  return (
    <>
      <HeaderWeb />
      <main className="pb-5" style={{ marginTop: "95px" }}>
        <UserData />
        <div className="container mt-4">
          <div className="row">
            {services.map((service) => (
              <ServicesCard
                key={service.service_code}
                navigate={navigate}
                service={service}
              />
            ))}
          </div>
        </div>
        <div className="container mt-4 d-flex flex-column">
          <p
            className="m-0 ps-3"
            style={{ fontSize: "1.3rem", fontWeight: "600" }}
          >
            Temukan promo menarik
          </p>
        </div>
        <GliderData banners={banners} />
      </main>
    </>
  );
};
