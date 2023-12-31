import React from "react";

export const ServicesCard = ({ service, navigate }) => {
  return (
    <div className="d-flex flex-column col-4 col-md-2 col-lg-1 text-center">
      <img
        onClick={() => navigate(`/payment/${service.service_code}`)}
        id="services-id"
        className="rounded w-100"
        src={service.service_icon}
      />
      <p className="mt-2 mb-0 text-center" style={{ fontSize: "0.8rem" }}>
        {service.service_name}
      </p>
    </div>
  );
};
