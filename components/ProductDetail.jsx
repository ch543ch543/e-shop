import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import Quantity from "./cart/Quantity";
import { Button } from "antd";
import { urlFor } from "../lib/client";

const ProductDetail = ({ product }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };
  return (
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img
            src={urlFor(image && image[index])}
            className="product-detail-image"
          />
        </div>
        <div className="small-images-container">
          {image?.map((item, i) => (
            <img
              key={i}
              src={urlFor(item)}
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1>{name.en}</h1>
        {/* <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div> */}
        <p>{details}</p>
        <p className="price">${price}</p>
        <Quantity />
        <div className="buy-buttons">
          <Button
            type="secondary"
            className="add-to-cart"
            onClick={() => onAdd(product, qty)}
          >
            Add to Cart
          </Button>
          <Button type="secondary" className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
