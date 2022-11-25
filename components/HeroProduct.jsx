import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import gsap from "gsap";

const HeroProduct = ({ products }) => {
  const handleScroll = (event) => {
    console.log("scroll");
    if (event.deltaX < 0) {
      setTimeout(() => {
        document.getElementsByClassName(
          "products-container"
        )[1].scrollLeft -= 20;
      }, 1000);
    } else if (event.deltaX > 0) {
      document.getElementsByClassName("products-container")[1].scrollLeft += 20;
    }
  };
  useEffect(() => {
    const overlay = document.querySelector(".shell.shell1");
    if (window) {
      window.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
      });
      return window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <div
      className="products-heading"
      style={{
        backgroundImage: `url(${
          require("/public/product_background.jpg").default.src
        })`,
      }}
    >
      <div className="overflow-container" onScroll={handleScroll}>
        <div className="products-container">
          {products?.map((product, key) =>
            (key + 1) % 3 == 1 ? (
              <ProductCard
                key={product._id}
                product={product}
                productClass={"one"}
              />
            ) : (key + 1) % 3 == 2 ? (
              <ProductCard
                key={product._id}
                product={product}
                productClass={"two"}
              />
            ) : (
              <ProductCard
                key={product._id}
                product={product}
                productClass={"three"}
              />
            )
          )}
        </div>
        <img
          className="shell shell1"
          src={require("../public/shell1.png").default.src}
        ></img>
        <img
          className="shell shell2"
          src={require("../public/shell3.png").default.src}
        ></img>
      </div>
    </div>
  );
};

export default HeroProduct;
