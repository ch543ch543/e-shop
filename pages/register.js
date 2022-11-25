import React, { useEffect } from "react";
import RegisterForm from "../components/form/RegisterForm";
import { navAnimation } from "../lib/animation";

const register = () => {
  useEffect(() => {
    navAnimation();
  }, []);
  return (
    <div className="register-form">
      <RegisterForm />
    </div>
  );
};

export default register;
