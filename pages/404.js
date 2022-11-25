import React, { useEffect } from "react";
import Link from "next/link";
import { navAnimation } from "../lib/animation";

const FourOhFour = () => {
  useEffect(() => {
    navAnimation();
  }, []);
  return (
    <div>
      <div>404</div>
      <Link href="/">Go Back Home!</Link>
    </div>
  );
};

export default FourOhFour;
