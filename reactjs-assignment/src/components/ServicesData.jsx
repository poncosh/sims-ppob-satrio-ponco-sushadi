import React from "react";

export const ServicesData = ({ services }) => {
  return (
    <div className="container">
      <div className="row">
        {services.map((el) => (
          <div
            id="services-id"
            className="d-flex flex-column col-4 col-md-2 col-lg-1 text-center"
          >
            <img
              className="rounded"
              src={el.service_icon}
              style={{ width: "100%" }}
            />
            <p className="mt-2 mb-0 text-center" style={{ fontSize: "0.8rem" }}>
              {el.service_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
