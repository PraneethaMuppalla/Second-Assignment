import React, { useEffect, useState } from "react";
import Form from "./Form";
import MedicinesList from "./MedicinesList";

function Home() {
  const [medicinesList, setMedicinesList] = useState([]);

  const addMedicineHandler = (newMedicine) => {
    const newMedicines = [...medicinesList, newMedicine];
    localStorage.setItem("medicines", JSON.stringify(newMedicines));
    setMedicinesList(newMedicines);
  };

  useEffect(() => {
    const list = localStorage.getItem("medicines");
    if (list) {
      setMedicinesList(JSON.parse(list));
    }
  }, []);

  return (
    <>
      <Form onAddMedicine={addMedicineHandler} />
      <MedicinesList medicines={medicinesList} />
    </>
  );
}

export default Home;
