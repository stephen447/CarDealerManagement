import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { formatNumberToPrice } from "../../../General/Other/GeneralFunctions";
import styles from "./StockPage.module.css";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useState, useEffect } from "react";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";
import {
  formatNumberToMileage,
  formatDateStringToDateInput,
  formatRegistration,
  convertScreamingSnakeToDisplayCase,
} from "../../../General/Other/GeneralFunctions";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Warning from "../../../General/Component/Warning/Warning";
import Loader from "../../../General/Component/Loader/Loader";

function StockPage() {
  const { id } = useParams();
  const dealer = true;
  const [editMode, setEditMode] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [tempStockData, setTempStockData] = useState(stockData);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");

  // Will get from datastore in future
  const statusOptions = [
    { value: "DUE_IN", label: "Due In" },
    { value: "IN_PREP", label: "In Prep" },
    { value: "ON_SALE", label: "Sale" },
    { value: "SOLD", label: "Sold" },
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

  useEffect(() => {
    async function apiCall() {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/v1/car/${id}`);

        const formattedData = {
          make: response.data.make,
          model: response.data.model,
          year: response.data.year,
          description: response.data.description,
          registration: formatRegistration(response.data.registration),
          price: response.data.price,
          type: response.data.type,
          status: response.data.status,
          buyInDate: formatDateStringToDateInput(response.data.buyInDate),
          engineSize: response.data.engineSize,
          engineType: response.data.engineType,
          transmission: response.data.transmission,
          mileage: response.data.mileage,
          color: response.data.color,
          condition: response.data.condition,
        };

        setStockData(formattedData);
        setTempStockData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setWarning("Error fetching stock");
        setLoading(false);
      }
    }
    apiCall();
  }, [id]);

  function handleSave() {
    setTempStockData({
      ...tempStockData,
      registration: formatRegistration(tempStockData?.registration),
    });
    axiosInstance.put(`/api/v1/car/${id}`, tempStockData);
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
      {loading ? (
        <div className={generalStyles["content-container"]}>
          <Loader />
        </div>
      ) : warning ? (
        <div className={generalStyles["content-container"]}>
          <Warning message={warning} />
        </div>
      ) : editMode === false ? (
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
          </div>

          <div className={styles["stock-item-picture-container"]}>
            <img
              className={styles["stock-item-picture"]}
              src="/Pics/CarFront.jpeg"
              alt=""
            />
          </div>

          <div className={styles["stock-item-details-container"]}>
            <h2> Vehicle Details</h2>
            <div className={generalStyles["form-grid"]}>
              <p>Engine Size: {stockData.engineSize}</p>
              <p>Engine Type: {stockData.engineType}</p>
              <p>Transmission: {stockData.transmission}</p>
              <p>Mileage: {formatNumberToMileage(stockData.mileage)} km</p>
              <p>Color: {stockData.color}</p>
              <p>
                Condition:{" "}
                {convertScreamingSnakeToDisplayCase(stockData.condition)}
              </p>
            </div>
          </div>

          <div className={styles["stock-item-details-container"]}>
            <h2>Description</h2>
            <div className={generalStyles["form-grid"]}>
              <p>{stockData.description}</p>
            </div>
          </div>

          {dealer && (
            <div className={styles["stock-item-details-container"]}>
              <h2>Dealer Details</h2>
              <div className={generalStyles["form-grid"]}>
                <p>Buy In Date: {stockData.buyInDate}</p>
                <p>Last Updated: {stockData.updatedAt}</p>
                <p>
                  Status: {convertScreamingSnakeToDisplayCase(stockData.status)}
                </p>
                <p>
                  Type: {convertScreamingSnakeToDisplayCase(stockData.type)}
                </p>
                <div className={generalStyles["form-button-container"]}>
                  <button
                    onClick={() => setEditMode(true)}
                    className={generalStyles["button-primary"]}
                  >
                    Edit
                  </button>
                  <button className={generalStyles["button-primary"]}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <main className={generalStyles["content-container"]}>
          <div className={generalStyles["form-grid"]}>
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
              label="Engine Size"
              name="engineSize"
              type="number"
              formData={tempStockData}
              setFormData={setTempStockData}
            />
            <SelectInput
              label="Engine Type"
              name="engineType"
              formData={tempStockData}
              setFormData={setTempStockData}
              options={engineTypeOptions}
            />
            <TextInput
              label="Color"
              name="color"
              type="text"
              formData={tempStockData}
              setFormData={setTempStockData}
            />
            <TextInput
              label="Mileage"
              name="mileage"
              type="number"
              formData={tempStockData}
              setFormData={setTempStockData}
            />
            <SelectInput
              label="Type"
              name="type"
              formData={tempStockData}
              setFormData={setTempStockData}
              options={typeOptions}
            />
            <SelectInput
              label="Transmission"
              name="transmission"
              formData={tempStockData}
              setFormData={setTempStockData}
              options={transmissionOptions}
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
            <div className={generalStyles["form-button-container"]}>
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
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default StockPage;
