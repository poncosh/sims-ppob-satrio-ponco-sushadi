import React from "react";

export const GliderCard = ({ banner }) => {
  return (
    <li className="glide__slide">
      <div className="container">
        <img
          className="w-100"
          style={{ objectFit: "cover" }}
          src={banner.banner_image}
        />
      </div>
    </li>
  );
};
