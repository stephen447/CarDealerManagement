import Header from "../../Components/Header/Header";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";

function DealPage() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  // ToDofetch deal data, try fetch locally if not found fetch from the db
  const testDealsData = {
    id: "1",
    dealerId: "1",
    salespersonId: "1",
    salesperson: {
      name: "John Doe",
    },
    carId: "1",
    car: {
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      registration: "201-D-123",
    },
    agreedPrice: 23000,
    pickupDate: "",
    dealDate: "",
    deposit: 12000,
    balance: 13000,
    finance: true,
    financeStatus: "AWAITING PAYOUT",
    financeAmount: 13000,
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerNumber: "1234567890",
  };
  const [dealData, setDealData] = useState(testDealsData);
  console.log(dealData);

  return (
    <div>
      <Header />
      <main className={generalStyles["main-container"]}>
        <h1>Deal ID: {id}</h1>
        {editMode ? (
          <div className={generalStyles["content-container"]}>
            <div>
              <h2>Vehicle Details</h2>
              <SelectInput
                label="Vehicle"
                name="carId"
                formData={dealData}
                setFormData={setDealData}
                options={[]}
              />
            </div>
            <div className={generalStyles["section"]}>
              <h2>Person Details</h2>
              <SelectInput
                label="Salesperson"
                name="salespersonId"
                formData={dealData}
                setFormData={setDealData}
                options={[]}
              />

              <TextInput
                label="Customer Name"
                name="customerName"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Customer Email"
                name="customerEmail"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Customer Number"
                name="customerNumber"
                formData={dealData}
                setFormData={setDealData}
              />
            </div>
            <div>
              <h2>Deal Details</h2>
              <TextInput
                label="Agreed Price"
                name="agreedPrice"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Deposit"
                name="deposit"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Balance"
                name="balance"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Finance"
                name="finance"
                formData={dealData}
                setFormData={setDealData}
              />
              <SelectInput
                label="Finance Status"
                name="financeStatus"
                formData={dealData}
                setFormData={setDealData}
                options={[]}
              />
              <TextInput
                label="Finance Amount"
                name="financeAmount"
                formData={dealData}
                setFormData={setDealData}
              />
            </div>
            <button
              onClick={() => setEditMode(false)}
              className={generalStyles["button-primary"]}
            >
              Cancel
            </button>
            <button
              onClick={() => setEditMode(false)}
              className={generalStyles["button-primary"]}
            >
              Save
            </button>
          </div>
        ) : (
          <div className={generalStyles["content-container"]}>
            <div>
              <h2>Vehicle Details</h2>
              <p>Make: {dealData?.car?.make}</p>
              <p>Model: {dealData?.car?.model}</p>
              <p>Year: {dealData?.car?.year}</p>
              <p>Price: {dealData?.agreedPrice}</p>
            </div>
            <div>
              <h2> Person Details</h2>
              <p>Salesperson: {dealData?.salesperson?.name}</p>
              <p>Customer Name: {dealData?.customerName}</p>
              <p>Customer Email: {dealData?.customerEmail}</p>
              <p>Customer Number: {dealData?.customerNumber}</p>
            </div>
            <div>
              <h2>Deal Details</h2>
              <p>Agreed Price: {dealData?.agreedPrice}</p>
              <p>Deposit: {dealData?.deposit}</p>
              <p>Balance: {dealData?.balance}</p>
              <p>Finance: {dealData?.finance}</p>
              <p>Finance Status: {dealData?.financeStatus}</p>
              <p>Finance Amount: {dealData?.financeAmount}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className={generalStyles["button-primary"]}
            >
              Edit
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export default DealPage;
