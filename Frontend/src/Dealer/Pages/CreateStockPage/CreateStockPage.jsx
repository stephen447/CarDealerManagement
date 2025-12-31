import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";
import { useState } from "react";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import styles from "./CreateStockPage.module.css";

function CreateStockPage() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registration: "",
    price: "",
    status: "",
    buyInDate: "",
    description: "",
  });

  const statusOptions = [
    { value: "DUEIN", label: "Due In" },
    { value: "SALE", label: "Sale" },
    { value: "SOLD", label: "Sold" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      make: "",
      model: "",
      year: "",
      registration: "",
      price: "",
      status: "",
      buyInDate: "",
      description: "",
    });
  };

  // Get the options for the select from the db

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={styles["page-container"]}>
        <SidebarNav items={DealerNavLinks.stock} />
        <div className={generalStyles["content-container"]}>
          <h1>Create Stock</h1>
          <form onSubmit={handleSubmit} className={generalStyles["form"]}>
            <TextInput
              label="Make"
              name="make"
              type="text"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Model"
              name="model"
              type="text"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Year"
              name="year"
              type="number"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Registration"
              name="registration"
              type="text"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Price"
              name="price"
              type="number"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Buy In Date"
              name="buyInDate"
              type="date"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Description"
              name="description"
              type="text"
              formData={formData}
              setFormData={setFormData}
            />
            <SelectInput
              label="Status"
              name="status"
              options={statusOptions}
              formData={formData}
              setFormData={setFormData}
            />
            <button type="submit" className={generalStyles["button-primary"]}>
              Create Stock
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateStockPage;
