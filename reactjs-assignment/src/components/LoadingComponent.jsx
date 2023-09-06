import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export const LoadingComponent = () => {
  return (
    <div id="preloader">
      <div className="loading">
        <Player
          src="https://lottie.host/97509ce2-af92-4db0-9c44-7978a96e907d/LvN0vmCRJS.json"
          background="transparent"
          speed="1"
          style={{ width: 300 + "px", height: 300 + "px" }}
          loop={true}
          autoplay={true}
        ></Player>
      </div>
    </div>
  );
};
