import React from "react";

import Card from "../UI/Card/Card";
import MedicineItem from "./MedicineItem/MedicineItem";
import classes from "./MedicinesList.module.css";

const MedicinesList = (props) => {
  const medicinesList = props.medicines.map((medicine) => (
    <MedicineItem
      key={medicine.id}
      name={medicine.name}
      description={medicine.description}
      price={medicine.price}
      quantity={medicine.quantity}
      id={medicine.id}
    />
  ));
  return (
    <section className={classes.medicines}>
      <Card>
        <ul>{medicinesList}</ul>
      </Card>
    </section>
  );
};

export default MedicinesList;
