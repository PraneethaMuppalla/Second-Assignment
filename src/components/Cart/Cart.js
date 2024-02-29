import React, { useContext } from "react";

import CartItem from "./CartItem";
import CartContext from "../../context/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  console.log(ctx);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    console.log(id);
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.quantity}
          price={item.price}
          remainingQty={item.remainingQty}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button disabled={!hasItems} className={classes.button}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
