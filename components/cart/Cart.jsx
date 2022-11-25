import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/StateContext";
import Quantity from "./Quantity";
import { Button } from "antd";
import { urlFor } from "../../lib/client";

import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Cart = () => {
  const cartRef = useRef();
  const router = useRouter();
  const {
    totalPrice,
    totalQuantities,
    userInfo,
    cartItems,
    setCartItems,
    setShowCart,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    setShowCart(false);
    if (!userInfo) {
      return router.push("/login");
    }
    return router.push("/shipping");
  };

  useEffect(() => {
    setCartItems(
      Cookies.get("cartItems")
        ? JSON.parse(Cookies.get("cartItems"))
        : cartItems
    );
  }, []);

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>You have no items in your shopping cart.</h3>
            <Link href="/">
              <Button type="secondary" onClick={() => setShowCart(false)}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name.en}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <Quantity
                      position="cart"
                      itemID={item._id}
                      itemQuantity={item.quantity}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <Button type="secondary" onClick={handleCheckout}>
                Pay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
