import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../lib/client";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

import { Menu, Drawer, Button, Icon } from "antd";
import "../node_modules/font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantites } = useStateContext();
  const [navData, setNavData] = useState([{ children: [] }]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDrawerKeys, setOpenDrawerKeys] = useState(["sub1"]);
  const [windowSize, setWindowSize] = useState({
    innerWidth: 1024,
    innerHeight: 1024,
  });
  const handleWindowResize = () => {
    const { innerWidth, innerHeight } = window;
    // console.log("innerWidth", innerWidth);
    return setWindowSize({
      innerWidth: innerWidth,
      innerHeight: innerHeight,
    });
  };

  const getnavData = async () => {
    console.log("getnavData");
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
            return getItem(level2Item.name, level2Item.slug.current);
          })
        )
      );
    });
    // console.log("navData", data);
    return setNavData(data);
  };

  //drawer functions
  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

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
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="navbar-container">
      {windowSize.innerWidth > 1024 && (
        <Menu mode="horizontal">
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
      )}
      {windowSize.innerWidth <= 1024 && (
        <>
          <button className="mobile-menu-btn" type="button">
            <img
              src={require("../public/burger-bar.png").default.src}
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
          </Drawer>
        </>
      )}

      <Link href="/">
        <a className="logo">LOU.YETU</a>
      </Link>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantites}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
