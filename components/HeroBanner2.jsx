import React from "react";
import Link from "next/link";

const HeroBanner2 = ({ productCats }) => {
  return (
    <div
      className="hero-banner2-container"
      // style={{ backgroundImage: `url(${urlFor(heroBanner.image)})` }}
    >
      <div className="menu-items">
        {productCats?.map((cat) => (
          <Link href={`/shop/${cat.slug.current}`} passHref>
            <h1 className="extra" id={cat._id}>
              {cat.name}.
            </h1>
          </Link>
        ))}
      </div>
      <img
        className="img-right"
        src={require("/public/childrenOnTheBeach.jpg").default.src}
      ></img>
    </div>
  );
};

export default HeroBanner2;
