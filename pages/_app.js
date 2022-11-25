import React from "react";
import { Toaster } from "react-hot-toast";
import { client } from "../lib/client";
import "antd/dist/antd.css";
import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
// import '../styles/custom_ant_ui/style.less'

function MyApp({ Component, pageProps, typeMenuList }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default MyApp;
