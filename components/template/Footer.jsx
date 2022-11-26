import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  const toTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 500);
  };
  return (
    <div className="footer-container">
      <div className="left">
        <Link href="/">
          <h1>
            <a className="logo">iciun.vita</a>
          </h1>
        </Link>
        <p>© Copyright iciun.vita</p>
      </div>
      <div className="middle">
        <a href="#">
          <span>Instagram</span>
        </a>
        <a href="#">
          <span>Facebook</span>
        </a>
        <a href="#">
          <span>Policy</span>
        </a>
      </div>
      <div className="right">
        <button
          className="toTop"
          style={{
            backgroundImage: `url(
              ${require("/public/stoneWithPearls.jpg").default.src}
            )`,
          }}
          onClick={() => toTop()}
        >
          <span>TO TOP</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
