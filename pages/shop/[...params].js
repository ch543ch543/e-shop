import React, { useEffect } from "react";
import { client } from "../../lib/client";
import { navAnimation } from "../../lib/animation";
import { ProductCard, ProductDetail } from "../../components";

const ProductTypePage = ({
  allProducts,
  allTypeProducts,
  allCatProducts,
  product,
  params,
}) => {
  useEffect(() => {
    navAnimation();
  }, []);
  return (
    <>
      {params[0] && !params[1] && (
        <div className="products-container">
          {allCatProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {params[0] && params[1] && !params[2] && (
        <div className="products-container">
          {allTypeProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {params[0] && params[1] && params[2] && (
        <div>
          <ProductDetail product={product} />
          <div className="maylike-products-wrapper">
            <h2>Other Stories</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {allProducts.map((item, key) => (
                  <ProductCard className={key} key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ params: { params } }) => {
  const catQuery = `*[_type == "productCat" && slug.current == '${params[0]}'][0]`;
  const typeQuery = `*[_type == "productType" && slug.current == '${params[1]}'][0]`;
  const productQuery = `*[_type == "product" && slug.current == '${params[2]}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const filterCatQuery = `*[_type == "product" && category == '${params[0]}']`;
  const filterTypeQuery = `*[_type == "product" && type == '${params[1]}']`;

  const category = await client.fetch(catQuery);
  const type = await client.fetch(typeQuery);
  const product = await client.fetch(productQuery);
  const allProducts = await client.fetch(productsQuery);
  const allCatProducts = await client.fetch(filterCatQuery);
  const allTypeProducts = await client.fetch(filterTypeQuery);
  return {
    props: {
      category,
      type,
      product,
      allProducts,
      allCatProducts,
      allTypeProducts,
      params,
    },
  };
};

export default ProductTypePage;
