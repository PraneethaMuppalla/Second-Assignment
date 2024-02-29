import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  totalProducts: [],
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //new Total
    const newTotal =
      state.totalAmount + action.item.price * action.item.quantity;
    //new products
    const existingProductIndex = state.totalProducts.findIndex(
      (each) => each.id === action.item.id
    );
    const existingMedicine = state.totalProducts[existingProductIndex];
    let updatedMedicine = {
      ...existingMedicine,
      quantity: existingMedicine.quantity - action.item.quantity,
    };
    let remainingQty = updatedMedicine.quantity;
    const updatedMedicines = [...state.totalProducts];
    updatedMedicines[existingProductIndex] = updatedMedicine;
    //cart items
    const indexOfItemIfPresent = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItem;
    let updatedItems;
    if (indexOfItemIfPresent !== -1) {
      const existingCartItem = state.items[indexOfItemIfPresent];
      updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
        remainingQty: remainingQty,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfItemIfPresent] = updatedItem;
    } else {
      updatedItems = [
        ...state.items,
        { ...action.item, remainingQty: remainingQty },
      ];
    }

    return {
      items: updatedItems,
      totalAmount: newTotal,
      totalProducts: updatedMedicines,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingIndex];
    const newTotal = state.totalAmount - existingCartItem.price;
    const existingProductIndex = state.totalProducts.findIndex(
      (each) => each.id === action.id
    );

    const existingMedicine = state.totalProducts[existingProductIndex];

    let updatedMedicine = {
      ...existingMedicine,
      quantity: existingMedicine.quantity + 1,
    };

    const updatedMedicines = [...state.totalProducts];
    updatedMedicines[existingProductIndex] = updatedMedicine;
    let remainingQty = updatedMedicine.quantity;
    let updatedItems;
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((each) => each.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
        remainingQty,
      };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: newTotal,
      totalProducts: updatedMedicines,
    };
  }
  if (action.type === "ADD_MEDICINE") {
    let newTotalProducts = [...state.totalProducts, action.newMedicine];
    return { ...state, totalProducts: newTotalProducts };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  };
  const addMedicineHandler = (newMedicine) => {
    dispatchCartAction({
      type: "ADD_MEDICINE",
      newMedicine,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    totalProducts: cartState.totalProducts,
    addMedicine: addMedicineHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
