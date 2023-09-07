import React, { useRef, useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { GliderCard } from "./GliderCard";

const sliderConfiguration = {
  type: "slider",
  startAt: 0,
  breakpoints: {
    1800: {
      perView: 4,
    },
    800: {
      perView: 2,
    },
    500: {
      perView: 1,
    },
  },
  autoplay: 4000,
  swipeThreshold: 80,
  dragThreshold: 80,
  bound: true,
  peek: {
    before: 50,
    after: 50,
  },
};

export const GliderData = ({ banners }) => {
  const glideRef = useRef();

  useEffect(() => {
    const slider = new Glide(glideRef.current, sliderConfiguration);
    slider.mount();
  }, [glideRef]);

  return (
    <div ref={glideRef} className="glide mt-2">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {banners.map((banner) => (
            <GliderCard key={banner.banner_name} banner={banner} />
          ))}
        </ul>
      </div>
    </div>
  );
};
