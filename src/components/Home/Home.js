import React, { useContext } from "react";
import Form from "./Form";
import MedicinesList from "./MedicinesList";
import CartContext from "../../context/cart-context";
import axios from "axios";

function Home() {
  const ctx = useContext(CartContext);

  const addMedicineHandler = async (newMedicine) => {
    try {
      const response = await axios.post(
        `https://crudcrud.com/api/c7ef1ef2650c4a4a8e958bc635ce9de3/medicine`,
        newMedicine
      );
      //const data = await response.json();
      //console.log(response);
      ctx.addMedicine(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form onAddMedicine={addMedicineHandler} />
      <MedicinesList medicines={ctx.totalProducts} />
    </>
  );
}

export default Home;
