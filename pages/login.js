import React, { useEffect } from "react";
import LoginForm from "../components/form/LoginForm";
import { navAnimation } from "../lib/animation";

const login = () => {
  useEffect(() => {
    navAnimation();
  }, []);
  return (
    <div className="register-form">
      <LoginForm />
    </div>
  );
};

export default login;
