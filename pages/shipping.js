import React, { useState } from "react";
import CheckoutWizard from "../components/checkout/CheckoutWizard";
import { navAnimation } from "../lib/animation";

const shipping = () => {
  useEffect(() => {
    navAnimation();
  }, []);
  return <CheckoutWizard />;
};

export default shipping;
