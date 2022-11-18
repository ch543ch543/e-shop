import React from "react";
import { Form, Button } from "antd";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/client";
import Quantity from "../Quantity";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "../../lib/getStripe";
import toast from "react-hot-toast";

const ConfirmForm = ({ fields }) => {
  const { cartItems, setCartItems, totalQuantites, totalPrice } =
    useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        fields={fields}
        onFieldsChange={(_, allFields) => {
          onChange(allFields);
        }}
        // onFinish={goNextPage}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        // validateMessages={validateMessages}
      >
        <Form.Item label="Name">{fields[0].value}</Form.Item>
        <Form.Item label="Phone">{fields[1].value}</Form.Item>
        <Form.Item label="Address">{fields[2].value}</Form.Item>
        <Form.Item label="City">{fields[3].value}</Form.Item>
        <Form.Item label="Postcode">{fields[4].value}</Form.Item>
        <Form.Item label="Country">{fields[5].value}</Form.Item>

        <Form.Item label="Products">
          {cartItems.map((item) => (
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
                </div>
              </div>
            </div>
          ))}
        </Form.Item>
        <Form.Item label="Subtotal">${totalPrice}</Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
          }}
        >
          <Button
            type="secondary"
            onClick={handleCheckout}
            style={{ width: "100%" }}
          >
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ConfirmForm;
