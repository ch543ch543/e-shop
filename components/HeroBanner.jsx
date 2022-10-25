import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <img src={urlFor(heroBanner.image)} alt="jewellery" className="hero-banner-image" />
        <Link href={`/product/${heroBanner.product}`}>
          <Button type="primary">{heroBanner.buttonText}</Button>
        </Link>
    </div>
  )
}

export default HeroBanner;
