import React from "react";

import CartButton from "./CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <h2>Quick Heal</h2>
      <CartButton onShowCart={props.onShowCart} />
    </header>
  );
};

export default MainHeader;
