import React, { useRef, useState } from "react";

import classes from "./MedicineItemForm.module.css";

const MedicineItemForm = (props) => {
  const [amount, setAmount] = useState(1);

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddToCart(+amount);
  };
  return (
    <>
      {props.quantity == 0 ? (
        <p>No Product</p>
      ) : (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.input}>
            <label>Amount</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min="1"
              max={props.quantity}
              step="1"
              value={amount}
            />
          </div>

          <button type="submit">+ Add</button>
        </form>
      )}
    </>
  );
};

export default MedicineItemForm;
