import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import jsCookie from "js-cookie";

const Context = createContext(); //initial context provider

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(
    Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : []
  ); //the items will come from local storage
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantites, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [userInfo, setUserInfo] = useState(
    Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null
  );
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [userName, setUserName] = useState(null);
  let foundProduct;
  let index;

  useEffect(() => {
    countTotalPrice();
    countTotalQuantity();
  }, [cartItems]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });
      renewCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      renewCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name.en} added to the cart.`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id); //splice is a mutated method, we need to use unmutated methods like filter

    if (value === "inc") {
      renewCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        renewCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
      }
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    renewCartItems(newCartItems);
  };

  const incQty = () => {
    setQty((preQty) => preQty + 1);
  };

  const decQty = () => {
    setQty((preQty) => {
      if (preQty - 1 < 1) return 1;
      return preQty - 1;
    });
  };

  const renewCartItems = (items) => {
    setCartItems(items);
    jsCookie.set("cartItems", JSON.stringify(items));
  };

  const countTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  };

  const countTotalQuantity = () => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
    });
    setTotalQuantities(totalQuantity);
  };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "USER_LOGIN":
  //       return { ...state, userInfo: action.payload };
  //     default:
  //       return state;
  //   }
  // };
  // const StoreProvider = (props) => {
  //   const value = { state, dispatch };
  // };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantites,
        setTotalQuantities,
        qty,
        userInfo,
        setUserInfo,
        userName,
        setUserName,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context); //to get context value
