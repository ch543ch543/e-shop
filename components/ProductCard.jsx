import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const ProductCard = ({
  product: { image, name, slug, price, category, type },
  productClass,
}) => {
  return (
    <>
      <Link href={`/shop/${category}/${type}/${slug.current}`}>
        <div className={"product-card " + productClass}>
          <div className={"product-card-img-block " + productClass}>
            <img src={urlFor(image && image[0])} className="product-image" />
          </div>
          <p className="product-name">{name.en}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
