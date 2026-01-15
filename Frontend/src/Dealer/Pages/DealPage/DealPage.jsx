import Header from "../../Components/Header/Header";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Loader from "../../../General/Component/Loader/Loader";
import Warning from "../../../General/Component/Warning/Warning";
import RecordSelectorModal from "../../../General/Component/RecordSelectorModal/RecordSelectorModal";
import {
  formatDateStringToDateInput,
  convertScreamingSnakeToDisplayCase,
  formatRegistration,
} from "../../../General/Other/GeneralFunctions";

function DealPage() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [dealData, setDealData] = useState(null);
  const [originalDealData, setOriginalDealData] = useState(null); // Track original data
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateWarning, setUpdateWarning] = useState("");

  // Modal states
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [salespersonModalOpen, setSalespersonModalOpen] = useState(false);

  // fetch deal data on load
  useEffect(() => {
    async function apiCall() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/deal/${id}`);
        setDealData(response.data, {
          registration: formatRegistration(response?.data?.registration),
          pickupDate: formatDateStringToDateInput(response?.data?.pickupDate),
          dealDate: formatDateStringToDateInput(response?.data?.dealDate),
        });
        setOriginalDealData(response.data); // Store original data
        setLoading(false);
      } catch (error) {
        console.error(error);
        setWarning("Error fetching deal");
        setLoading(false);
      }
    }
    apiCall();
  }, [id]);

  const handleSave = async () => {
    // Only send fields that have changed from original data
    const changedFields = {};

    // Compare current dealData with originalDealData to find changes
    Object.keys(dealData).forEach((key) => {
      if (originalDealData && dealData[key] !== originalDealData[key]) {
        changedFields[key] = dealData[key];
      }
    });

    if (dealData.registration) {
      dealData.registration = formatRegistration(dealData?.registration);
    }

    try {
      setUpdateLoading(true);
      setUpdateWarning("");
      const response = await axiosInstance.put(
        `/api/v1/deal/${id}`,
        changedFields
      );
      setDealData(response.data, {
        registration: formatRegistration(response?.data?.registration),
        pickupDate: formatDateStringToDateInput(response?.data?.pickupDate),
        dealDate: formatDateStringToDateInput(response?.data?.dealDate),
      });
      setOriginalDealData(response.data, {
        registration: formatRegistration(response?.data?.registration),
        pickupDate: formatDateStringToDateInput(response?.data?.pickupDate),
        dealDate: formatDateStringToDateInput(response?.data?.dealDate),
      });
      setEditMode(false);
      setUpdateLoading(false);
    } catch (error) {
      console.error(error);
      setUpdateWarning("Error updating deal");
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className={generalStyles["main-container"]}>
          <div className={generalStyles["content-container"]}>
            <Loader />
          </div>
        </main>
      </div>
    );
  }

  if (warning) {
    return (
      <div>
        <Header />
        <main className={generalStyles["main-container"]}>
          <div className={generalStyles["content-container"]}>
            <Warning message={warning} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className={generalStyles["main-container"]}>
        <h1>Deal ID: {id}</h1>
        {editMode ? (
          <div className={generalStyles["content-container"]}>
            <div>
              <h2>Vehicle Details</h2>
              {updateWarning && <Warning message={updateWarning} />}
              <div className={generalStyles["form-group"]}>
                <label>Vehicle</label>
                <div className={generalStyles["selected-value"]}>
                  {dealData?.car
                    ? `${dealData.car.make} ${dealData.car.model} (${dealData.car.year})`
                    : "No vehicle selected"}
                </div>
                <button
                  type="button"
                  className={generalStyles["button-primary"]}
                  onClick={() => {
                    setCarModalOpen(true);
                  }}
                >
                  Select Vehicle
                </button>
              </div>
            </div>
            <div className={generalStyles["section"]}>
              <h2>Person Details</h2>
              <div className={generalStyles["form-group"]}>
                <label>Salesperson</label>
                <div className={generalStyles["selected-value"]}>
                  {dealData?.salesperson
                    ? `${dealData.salesperson.firstName} ${dealData.salesperson.lastName}`
                    : "No salesperson selected"}
                </div>
                <button
                  type="button"
                  className={generalStyles["button-primary"]}
                  onClick={() => {
                    setSalespersonModalOpen(true);
                  }}
                >
                  Select Salesperson
                </button>
              </div>

              <TextInput
                label="Customer FirstName"
                name="customerFirstName"
                formData={dealData}
                setFormData={setDealData}
              />
              <TextInput
                label="Customer LastName"
                name="customerLastName"
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
              <TextInput
                label="Deal Date"
                name="dealDate"
                formData={dealData}
                setFormData={setDealData}
                type="date"
              />
              <TextInput
                label="Pickup Date"
                name="pickupDate"
                formData={dealData}
                setFormData={setDealData}
                type="date"
              />
            </div>
            <div>
              <h2>Deal Details</h2>
              <SelectInput
                label="Status"
                name="status"
                formData={dealData}
                setFormData={setDealData}
                options={[
                  { value: "PENDING", label: "Pending" },
                  { value: "Declined", label: "Declined" },
                  { value: "AGREED", label: "Agreed" },
                  { value: "CANCELLED", label: "Cancelled" },
                  { value: "COMPLETED", label: "Completed" },
                ]}
              />
              <TextInput
                label="Agreed Price"
                name="agreedPrice"
                formData={dealData}
                setFormData={setDealData}
                type="number"
              />
              <TextInput
                label="Deposit"
                name="deposit"
                formData={dealData}
                setFormData={setDealData}
                type="number"
              />
              <TextInput
                label="Balance"
                name="balance"
                formData={dealData}
                setFormData={setDealData}
                type="number"
              />
              <SelectInput
                label="Finance"
                name="finance"
                formData={dealData}
                setFormData={setDealData}
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
              />
              <SelectInput
                label="Finance Status"
                name="financeStatus"
                formData={dealData}
                setFormData={setDealData}
                options={[
                  { value: "NOT_APPLIED", label: "Not Applied" },
                  { value: "AWAITING_APPROVAL", label: "Awaiting Approval" },
                  { value: "APPROVED", label: "Approved" },
                  { value: "PENDING", label: "Pending" },
                  { value: "AWAITING_PAYMENT", label: "Awaiting Payment" },
                  { value: "PAID", label: "Paid" },
                ]}
              />
              <TextInput
                label="Finance Amount"
                name="financeAmount"
                formData={dealData}
                setFormData={setDealData}
                type="number"
              />
            </div>
            <button
              onClick={() => setEditMode(false)}
              className={generalStyles["button-primary"]}
              disabled={updateLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={generalStyles["button-primary"]}
              disabled={updateLoading}
            >
              {updateLoading ? <Loader size={16} /> : "Save"}
            </button>
          </div>
        ) : (
          <div className={generalStyles["content-container"]}>
            <div>
              <h2>Vehicle Details</h2>
              <p>Make: {dealData?.car?.make}</p>
              <p>Model: {dealData?.car?.model}</p>
              <p>Year: {dealData?.car?.year}</p>
              <p>Registration: {dealData?.car?.registration}</p>
              <p>Price: {dealData?.agreedPrice}</p>
            </div>
            <div>
              <h2> Person Details</h2>
              <p>
                Salesperson: {dealData?.salesperson?.firstName}{" "}
                {dealData?.salesperson?.lastName}
              </p>
              <p>
                Customer Name:{" "}
                {dealData?.customerFirstName + " " + dealData?.customerLastName}
              </p>
              <p>Customer Email: {dealData?.customerEmail}</p>
              <p>Customer Number: {dealData?.customerNumber}</p>
            </div>
            <div>
              <h2>Deal Details</h2>
              <p>Status: {dealData?.status}</p>
              <p>
                Deal Date:{" "}
                {dealData?.dealDate
                  ? new Date(dealData.dealDate).toLocaleDateString()
                  : ""}
              </p>
              <p>
                Pickup Date:{" "}
                {dealData?.pickupDate
                  ? new Date(dealData.pickupDate).toLocaleDateString()
                  : ""}
              </p>
              <p>Agreed Price: {dealData?.agreedPrice}</p>
              <p>Deposit: {dealData?.deposit}</p>
              <p>Balance: {dealData?.balance}</p>
              <p>Finance: {dealData?.finance ? "Yes" : "No"}</p>
              <p>
                Finance Status:{" "}
                {convertScreamingSnakeToDisplayCase(dealData?.financeStatus)}
              </p>
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

      {/* Record Selector Modals */}
      <RecordSelectorModal
        isOpen={carModalOpen}
        setIsOpen={setCarModalOpen}
        name="carId"
        title="Car"
        url="/api/v1/car"
        data={dealData}
        setData={setDealData}
        displayFields={["make", "model", "year", "registration"]}
        searchFields={["make", "model"]}
      />

      <RecordSelectorModal
        isOpen={salespersonModalOpen}
        setIsOpen={setSalespersonModalOpen}
        name={"salespersonId"}
        title={"SalesPerson"}
        url="/api/v1/user"
        data={dealData}
        setData={setDealData}
        displayFields={["firstName", "lastName"]}
        searchFields={["firstName", "lastName"]}
      />
    </div>
  );
}
export default DealPage;
