import React, { useState } from "react";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCardHandler = () => {
    setCartVisible(false);
  };
  return (
    <CartProvider>
      {cartVisible && <Cart onHideCart={hideCardHandler} />}
      <MainHeader onShowCart={showCartHandler} />
      <main>
        <Home />
      </main>
    </CartProvider>
  );
}

export default App;
