import React, { useState } from "react";
import { Steps, Button } from "antd";
const { Step } = Steps;
import ShippingForm from "./ShippingForm";
import ConfirmForm from "./ConfirmForm";

const CheckoutWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const goPreviousPage = () => {
    setActiveStep(activeStep - 1);
  };
  const goNextPage = () => {
    setActiveStep(activeStep + 1);
  };
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      name: ["phone"],
      value: "",
    },
    {
      name: ["address"],
      value: "",
    },
    {
      name: ["city"],
      value: "",
    },
    {
      name: ["postcode"],
      value: "",
    },
    {
      name: ["country"],
      value: "",
    },
  ]);
  return (
    <div className="checkout-page">
      <Steps current={activeStep}>
        <Step title="Shipping Information" />
        <Step title="Confirm and Place Order" />
      </Steps>
      {activeStep == 0 && (
        <ShippingForm
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
          goPreviousPage={goPreviousPage}
          goNextPage={goNextPage}
        />
      )}
      {activeStep == 1 && (
        <>
          <ConfirmForm fields={fields} />
          <Button type="text" onClick={goPreviousPage}>
            &larr; Previos Step
          </Button>
        </>
      )}
    </div>
  );
};

export default CheckoutWizard;
