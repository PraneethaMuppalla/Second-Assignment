import React from "react";

const CartContext = React.createContext({
  totalProducts: [],
  addMedicine: (medicine) => {},
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
});

export default CartContext;
