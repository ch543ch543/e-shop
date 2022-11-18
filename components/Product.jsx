import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, category, type } }) => {
  return (
    <div>
      <Link href={`/shop/${category}/${type}/${slug.current}`}>
        <div className="product-card">
          <div className="product-card-img-block">
            <img src={urlFor(image && image[0])} className="product-image" />
          </div>
          <p className="product-name">{name.en}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
