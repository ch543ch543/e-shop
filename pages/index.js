import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { Button } from 'antd';
 
 const Home = ({ products, bannerData }) => {
   return (
    <div>
      <HeroBanner heroBanner={ bannerData.length && bannerData[0]} />
      <div className='products-heading'>
      <div className='products-container'>
        {products?.map((product) => <Product product={product} />)}
      </div>
     </div>
    </div>
   )
 }

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);


  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
 