import React from "react";
import { useStateContext } from "../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Quantiy = ({ position, itemID, itemQuantity }) => {
  const { decQty, incQty, qty, toggleCartItemQuanitity } = useStateContext();
  return (
    <div className="quantity">
      <p className="quantity-desc">
        <span
          className="minus"
          onClick={
            position == "cart"
              ? () => toggleCartItemQuanitity(itemID, "dec")
              : decQty
          }
        >
          <AiOutlineMinus />
        </span>
        <span className="num">{position == "cart" ? itemQuantity : qty}</span>
        <span
          className="plus"
          onClick={
            position == "cart"
              ? () => toggleCartItemQuanitity(itemID, "inc")
              : incQty
          }
        >
          <AiOutlinePlus />
        </span>
      </p>
    </div>
  );
};

export default Quantiy;
