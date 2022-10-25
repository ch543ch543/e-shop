import React from "react";
import { useStateContext } from "../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Quantiy = () => {
  const { decQty, incQty, qty } = useStateContext();
  return (
    <div className="quantity">
      <p className="quantity-desc">
        <span className="minus" onClick={decQty}>
          <AiOutlineMinus />
        </span>
        <span className="num">{qty}</span>
        <span className="plus" onClick={incQty}>
          <AiOutlinePlus />
        </span>
      </p>
    </div>
  );
};

export default Quantiy;
