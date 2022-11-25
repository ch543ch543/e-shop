import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div
      className="hero-banner-container"
      style={{ backgroundImage: `url(${urlFor(heroBanner.image)})` }}
    >
      <h1 className="extra">
        FIND <br />
        YOUR <br />
        TRESURES
      </h1>
    </div>
  );
};

export default HeroBanner;
