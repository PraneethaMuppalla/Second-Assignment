import React, { useContext } from "react";

import CartContext from "../../../context/cart-context";
import MedicineItemForm from "./MedicineItemForm";
import classes from "./MedicineItem.module.css";

const MedicineItem = (props) => {
  const ctx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const newItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      quantity: amount,
      price: props.price,
    };
    ctx.addItem(newItem);
  };

  return (
    <li className={classes.medicine}>
      <div>
        <h3>{props.name}</h3>
        <h4 className={classes.description}>{props.description}</h4>
        <h4 className={classes.price}>Rs. {props.price}</h4>
        <h4 className={classes.price}>
          {props.quantity === 0 ? "No Quantity" : props.quantity}
        </h4>
      </div>
      <div>
        <MedicineItemForm
          id={props.id}
          onAddToCart={addToCartHandler}
          quantity={props.quantity}
        />
      </div>
    </li>
  );
};

export default MedicineItem;
