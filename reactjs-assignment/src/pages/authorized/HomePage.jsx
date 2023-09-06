import React, { useEffect } from "react";
import { useAuth } from "../../stores/auth/context";
import { Navigate } from "react-router-dom";
import { LoadingComponent } from "../../components/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { HeaderWeb } from "../../components/HeaderWeb";
import { UserData } from "../../components/UserData";
import { ServicesData } from "../../components/ServicesData";
import { getServices } from "../../stores/contents/reducers/contentReducer";

export const HomePage = () => {
  const { authState } = useAuth();
  const loading = useSelector((state) => state.content.isLoading);
  const dispatch = useDispatch();
  const services = useSelector((state) => state.content.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

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
        <ServicesData services={services} />
      </main>
    </>
  );
};
