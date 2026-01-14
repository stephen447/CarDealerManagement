import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";
import { useState } from "react";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import axiosInstance from "../../../General/Other/AxiosInstance";
import styles from "./CreateStockPage.module.css";

function CreateStockPage() {
  const emptyFormData = {
    make: "",
    model: "",
    year: "",
    registration: "",
    price: "",
    status: "",
    buyInDate: "",
    description: "",
    color: "",
    engineSize: "",
    engineType: "",
    transmission: "",
    mileage: "",
    dealerId: "1234",
    condition: "",
    type: "",
  };
  const [formData, setFormData] = useState(emptyFormData);

  const statusOptions = [
    { value: "DUE_IN", label: "Due In" },
    { value: "IN_PREP", label: "In Prep" },
    { value: "ON_SALE", label: "Sale" },
    { value: "SOLD", label: "Sold" },
  ];

  const engineTypeOptions = [
    {
      value: "Petrol",
      label: "Petrol",
    },
    {
      value: "Diesel",
      label: "Diesel",
    },
    {
      value: "Hybrid",
      label: "Hybrid",
    },
    {
      value: "Electric",
      label: "Electric",
    },
  ];

  const typeOptions = [
    { value: "RETAIL", label: "Retail" },
    { value: "TRADE", label: "Trade" },
  ];

  const transmissionOptions = [
    {
      value: "Automatic",
      label: "Automatic",
    },
    {
      value: "Manual",
      label: "Manual",
    },
  ];

  const conditionOptions = [
    { value: "NEW", label: "New" },
    { value: "USED", label: "Used" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance.post("/api/v1/car", formData);
    setFormData(emptyFormData);
  };

  // Get the options for the select from the db

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={DealerNavLinks.stock} />
        <div className={generalStyles["content-container"]}>
          <h1>Create Stock</h1>
          <form onSubmit={handleSubmit} className={generalStyles["form-grid"]}>
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
            <TextInput
              label="Engine Size"
              name="engineSize"
              type="number"
              formData={formData}
              setFormData={setFormData}
            />
            <SelectInput
              label="Engine Type"
              name="engineType"
              formData={formData}
              setFormData={setFormData}
              options={engineTypeOptions}
            />
            <TextInput
              label="Color"
              name="color"
              type="text"
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label="Mileage"
              name="mileage"
              type="number"
              formData={formData}
              setFormData={setFormData}
            />
            <SelectInput
              label="Type"
              name="type"
              formData={formData}
              setFormData={setFormData}
              options={typeOptions}
            />
            <SelectInput
              label="Transmission"
              name="transmission"
              formData={formData}
              setFormData={setFormData}
              options={transmissionOptions}
            />
            <SelectInput
              label="Condition"
              name="condition"
              options={conditionOptions}
              formData={formData}
              setFormData={setFormData}
            />
            <div className={generalStyles["form-button-container"]}>
              <button type="submit" className={generalStyles["button-primary"]}>
                Create Stock
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateStockPage;
