import React, { useReducer, useEffect, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Form.module.css";
import Button from "../UI/Button/Button";

const medicineNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.length > 3 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: null };
};

const priceReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: +action.val > 0 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: null };
};
const quantityReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: +action.val > 0 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: null };
};

const descriptionReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.length > 3 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: null };
};

const Form = (props) => {
  const [medicineState, dispatchMedicine] = useReducer(medicineNameReducer, {
    value: "",
    isvalid: null,
  });
  const [priceState, dispatchPrice] = useReducer(priceReducer, {
    value: "",
    isvalid: null,
  });
  const [descState, dispatchDesc] = useReducer(descriptionReducer, {
    value: "",
    isvalid: null,
  });
  const [quantityState, dispatchQuantity] = useReducer(quantityReducer, {
    value: "",
    isvalid: null,
  });

  const medicineRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  const medicineNameHandler = (event) => {
    dispatchMedicine({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };
  const descChangeHandler = (event) => {
    dispatchDesc({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const priceChangeHandler = (event) => {
    dispatchPrice({
      type: "USER_INPUT",
      val: +event.target.value,
    });
  };

  const quantityHandler = (event) => {
    dispatchQuantity({
      type: "USER_INPUT",
      val: +event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!medicineState.isvalid) {
      medicineRef.current.focus();
      return;
    } else if (!descState.isvalid) {
      descriptionRef.current.focus();
      return;
    } else if (!priceState.isvalid) {
      priceRef.current.focus();
      return;
    } else if (!quantityState.isvalid) {
      quantityRef.current.focus();
      return;
    } else {
      const newMedicine = {
        id: Math.round(Math.random() * 1000),
        name: medicineState.value,
        description: descState.value,
        price: +priceState.value,
        quantity: +quantityState.value,
      };
      props.onAddMedicine(newMedicine);
      dispatchMedicine({
        type: "RESTORE_INPUT",
      });
      dispatchDesc({
        type: "RESTORE_INPUT",
      });
      dispatchPrice({
        type: "RESTORE_INPUT",
      });
      dispatchQuantity({
        type: "RESTORE_INPUT",
      });
    }
  };

  useEffect(() => {
    medicineRef.current.focus();
  }, []);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            medicineState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="medicine">Medicine Name</label>
          <input
            ref={medicineRef}
            type="text"
            id="medicine"
            value={medicineState.value}
            onChange={medicineNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            descState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="desc">Description</label>
          <input
            ref={descriptionRef}
            type="text"
            id="desc"
            value={descState.value}
            onChange={descChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            priceState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="price">Price</label>
          <input
            ref={priceRef}
            type="number"
            id="price"
            value={priceState.value}
            onChange={priceChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            quantityState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="qty">Quantity</label>
          <input
            ref={quantityRef}
            type="number"
            id="qty"
            value={quantityState.value}
            onChange={quantityHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
