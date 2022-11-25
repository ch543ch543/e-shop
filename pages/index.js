import React, { useEffect } from "react";
import { client } from "../lib/client";
import { HeroProduct, HeroBanner, HeroBanner2 } from "../components";
import { homeAnimation } from "../lib/animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = ({ products, bannerData, productCats }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    homeAnimation();
  }, []);
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <HeroProduct products={products} />
      <HeroBanner2 productCats={productCats} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const catQuery = `*[_type == "productCat"]`;
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(query);
  const productCats = await client.fetch(catQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, productCats },
  };
};

export default Home;
