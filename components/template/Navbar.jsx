import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../../lib/client";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/router";
import { Cart } from "../";
import { useStateContext } from "../../context/StateContext";

import { Menu, Drawer, Button, Icon } from "antd";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const {
    showCart,
    setShowCart,
    totalQuantites,
    setTotalQuantities,
    userInfo,
    setUserInfo,
    userName,
    setUserName,
  } = useStateContext();
  const [navData, setNavData] = useState([{ children: [{ children: [] }] }]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDrawerKeys, setOpenDrawerKeys] = useState(["sub1"]);

  const userInfoBlock = () => {
    return (
      <div className="navRight">
        {userName ? (
          <>
            <Button type="text">
              <p>{userName}</p>
            </Button>
            <Button type="text" onClick={() => handleLogOut()}>
              <span>LOGOUT</span>
            </Button>
            <a type="button" onClick={() => setShowCart(true)}>
              <span>CART{`(`}</span>
              <span>{totalQuantites}</span>
              <span>{`)`}</span>
            </a>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <a className="loginBtn">
                <span>LOGIN</span>
              </a>
            </Link>
            <a type="button" onClick={() => setShowCart(true)}>
              <span>CART{`(`}</span>
              <span>{totalQuantites}</span>
              <span>{`)`}</span>
            </a>
          </>
        )}
      </div>
    );
  };
  const getItem = (label, key, children, type) => {
    return {
      key,
      children,
      label,
      type,
    };
  };
  const labelToLink = (slug, catSlug) => {
    return (
      <Link href={"/shop/" + slug + "/" + catSlug}>
        <a>{slug}</a>
      </Link>
    );
  };
  const handleLogOut = () => {
    Cookies.remove("userInfo");
    setUserInfo(null);
    setUserName(null);
    router.push("/");
  };

  const getnavData = async () => {
    const catQuery = `*[_type == "productCat"]`;
    const typeQuery = `*[_type == "productType"]`;
    const categories = await client.fetch(catQuery);
    const types = await client.fetch(typeQuery);
    const data = [{ key: "shop", label: "SHOP", children: [] }];

    categories.forEach((item) => {
      let level2Children = types.filter(
        (type) => type.category == item.slug.current
      );
      data[0].children.push(
        getItem(
          item.name,
          item.slug.current,
          level2Children.map((level2Item) => {
            return getItem(
              labelToLink(level2Item.slug.current, item.slug.current),
              level2Item.slug.current
            );
          })
        )
      );
    });
    // console.log("navData", data);
    return setNavData(data);
  };

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => openDrawerKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenDrawerKeys(keys);
    } else {
      setOpenDrawerKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    getnavData();
    setUserName(userInfo ? userInfo.name : null);
    setTotalQuantities(
      Cookies.get("cartItems")
        ? JSON.parse(Cookies.get("cartItems")).length
        : totalQuantites
    );
  }, []);
  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push("/");
  //     setUserName(null);
  //   }
  // }, [router, userInfo]);
  return (
    <>
      <div className="navbar-container">
        <Menu mode="horizontal" className="navLeft">
          <Menu.SubMenu key="SubMenu" title="shop">
            {navData[0].children.map((category) => {
              return (
                <Menu.ItemGroup key={category.label} title={category.label}>
                  <Menu.Item
                    key={`all-${category.label}`}
                    eventKey={`all-${category.label}`}
                  >
                    <Link
                      href={`/shop/${category.key}`}
                      passHref
                    >{`All ${category.label}`}</Link>
                  </Menu.Item>
                  {category.children.map((type) => {
                    return (
                      <Menu.Item key={type.key} eventKey={type.key}>
                        <Link
                          href={`/shop/${category.key}/${type.key}`}
                          passHref
                        >
                          {type.label}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.ItemGroup>
              );
            })}
          </Menu.SubMenu>
        </Menu>
        <button className="mobile-menu-btn" type="button">
          <img
            src={require("../../public/burger-bar.png").default.src}
            onClick={showDrawer}
          ></img>
        </button>
        <Drawer
          // title="Basic Drawer"
          className="mobile-menu-drawer"
          placement="left"
          closable={false}
          onClose={onCloseDrawer}
          open={drawerOpen}
          key="left"
        >
          <Menu
            mode="inline"
            openDrawerKeys={openDrawerKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 256,
            }}
            items={navData}
          />
          {userInfoBlock()}
        </Drawer>
        <Link href="/">
          <h1>
            <a className="logo">iciun.vita</a>
          </h1>
        </Link>

        {userInfoBlock()}
      </div>
      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
