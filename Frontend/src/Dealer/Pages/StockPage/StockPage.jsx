import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { formatNumberToPrice } from "../../../General/Other/GeneralFunctions";
import styles from "./StockPage.module.css";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { formatDateString } from "../../../General/Other/GeneralFunctions";
import { useState } from "react";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";

function StockPage() {
  const { id } = useParams();
  const dealer = true;
  const [editMode, setEditMode] = useState(false);
  // Will get from datastore in future
  const statusOptions = [
    { value: "DUEIN", label: "Due In" },
    { value: "SALE", label: "Sale" },
    { value: "SOLD", label: "Sold" },
  ];
  const date = new Date("2025-12-25");
  const date2 = new Date();
  //   TestData
  const stockDataTest = {
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    description:
      "Finished in a striking Graphite Grey metallic paint, this Mercedes-Benz E300e Sedan offers understated elegance paired with exceptional hybrid efficiency. The interior features refined beige imitation leather upholstery complemented by open-grained black ash wood trim with illuminated Mercedes-Benz pattern accents. Desirable highlights include the AMG Line styling (interior and exterior), a panoramic suite of assistance systems such as DISTRONIC adaptive cruise control, Active Lane Keeping Assist, and a 360° camera for complete driving confidence. The car is equipped with the latest MBUX Navigation Premium system with Augmented Reality and a large central display, wireless phone charging, ambient lighting, and heated front seats. Ride comfort is enhanced by comfort suspension and the advanced hybrid powertrain, delivering seamless performance with plug-in efficiency. With 19 AMG double-spoke alloy wheels, KEYLESS-GO, Blind Spot Monitoring, and a luxurious specification throughout, this E-Class plug-in hybrid strikes the perfect balance between sustainability, technology, and sophistication.",
    registration: "201-D-123",
    price: 10000,
    dealerId: "",
    dealer: "",
    buyInDate: formatDateString(date),
    createdAt: formatDateString(date),
    updatedAt: formatDateString(date2),
    status: "DUEIN",
    deal: "",
  };

  //   TODO: Try get data from local, if not get from API and store locally
  const [stockData, setStockData] = useState(stockDataTest);
  const [tempStockData, setTempStockData] = useState(stockData);

  function handleSave() {
    setStockData(tempStockData);
    setEditMode(false);
  }

  function handleCancel() {
    setTempStockData(stockData);
    setEditMode(false);
  }

  return (
    <div>
      <Header />
      {editMode === false ? (
        <main className={styles["stock-item"]}>
          <div className={styles["stock-item-header"]}>
            <div className={styles["stock-item-header-title"]}>
              <h1>{stockData.year}</h1>
              <h1>{stockData.make}</h1>
              <h1>{stockData.model}</h1>
            </div>
            <h1>{formatNumberToPrice(stockData.price)}</h1>
          </div>
          <div>
            <h2>{stockData.registration}</h2>
            <button
              onClick={() => setEditMode(true)}
              className={generalStyles["button-primary"]}
            >
              Edit
            </button>
          </div>
          <div className={styles["stock-item-picture-container"]}>
            <img
              className={styles["stock-item-picture"]}
              src="/Pics/CarFront.jpeg"
              alt=""
            />
          </div>
          <div>
            <h2>Description</h2>
            <p>{stockData.description}</p>
          </div>
          {dealer && (
            <div>
              <h2> Dealer Details</h2>
              <p>Buy In Date: {stockData.buyInDate}</p>
              <p>Last Updated: {stockData.updatedAt}</p>
              <p>Status: {stockData.status}</p>
            </div>
          )}
        </main>
      ) : (
        <main className={styles["stock-item-edit"]}>
          <TextInput
            label="Make"
            name="make"
            type="text"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Model"
            name="model"
            type="text"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Year"
            name="year"
            type="number"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Registration"
            name="registration"
            type="text"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Price"
            name="price"
            type="number"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Description"
            name="description"
            type="text"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <TextInput
            label="Buy In Date"
            name="buyInDate"
            type="date"
            formData={tempStockData}
            setFormData={setTempStockData}
          />
          <SelectInput
            label="Status"
            name="status"
            formData={tempStockData}
            setFormData={setTempStockData}
            options={statusOptions}
          />

          <button
            onClick={() => handleCancel()}
            className={generalStyles["button-primary"]}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave()}
            className={generalStyles["button-primary"]}
          >
            Save
          </button>
        </main>
      )}
    </div>
  );
}

export default StockPage;
