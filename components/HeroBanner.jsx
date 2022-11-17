import React from "react";
import Link from "next/link";
import { Button } from "antd";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div
      className="hero-banner-container"
      style={{ backgroundImage: `url(${urlFor(heroBanner.image)})` }}
    >
      <div className="hero-banner-text">{heroBanner.largeText1}</div>
      <Link href={`/product/${heroBanner.product}`}>
        <Button type="primary">{heroBanner.buttonText}</Button>
      </Link>
    </div>
  );
};

export default HeroBanner;
