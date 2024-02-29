import React, { useContext } from "react";
import Form from "./Form";
import MedicinesList from "./MedicinesList";
import CartContext from "../../context/cart-context";

function Home() {
  const ctx = useContext(CartContext);

  const addMedicineHandler = (newMedicine) => {
    ctx.addMedicine(newMedicine);
  };

  return (
    <>
      <Form onAddMedicine={addMedicineHandler} />
      <MedicinesList medicines={ctx.totalProducts} />
    </>
  );
}

export default Home;
