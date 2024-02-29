import React, { useEffect, useState } from "react";
import Form from "./Form";
// import Products from "./Products";

function Home() {
  const [medicinesList, setMedicinesList] = useState([]);

  const addMedicineHandler = (newMedicine) => {};

  const deleteProductHandler = (id) => {
    const filteredProducts = medicinesList.filter((each) => each.id !== id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    setMedicinesList(filteredProducts);
  };

  useEffect(() => {
    const list = localStorage.getItem("products");
    if (list) {
      setMedicinesList(JSON.parse(list));
    }
  }, []);

  return (
    <>
      <Form onAddMedicine={addMedicineHandler} />

      {/* <Products medicinesList={medicinesList} onDelete={deleteProductHandler} /> */}
    </>
  );
}

export default Home;
