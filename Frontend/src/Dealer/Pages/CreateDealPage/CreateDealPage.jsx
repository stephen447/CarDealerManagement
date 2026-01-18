import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";
import RecordSelectorModal from "../../../General/Component/RecordSelectorModal/RecordSelectorModal";
import { useState } from "react";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import axiosInstance from "../../../General/Other/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Warning from "../../../General/Component/Warning/Warning";
import Loader from "../../../General/Component/Loader/Loader";

function CreateDealPage() {
  const navigate = useNavigate();

  const emptyFormData = {
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerNumber: "",
    dealDate: "",
    pickupDate: "",
    agreedPrice: "",
    deposit: "",
    balance: "",
    finance: false,
    financeStatus: "NOT_APPLIED",
    financeAmount: "",
    status: "PENDING",
    carId: "",
    dealerId: "1234",
    salespersonId: "",
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");

  // Modal states
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [salespersonModalOpen, setSalespersonModalOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const [salespersonData, setSalespersonData] = useState([]);

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "Declined", label: "Declined" },
    { value: "AGREED", label: "Agreed" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const financeStatusOptions = [
    { value: "NOT_APPLIED", label: "Not Applied" },
    { value: "AWAITING_APPROVAL", label: "Awaiting Approval" },
    { value: "APPROVED", label: "Approved" },
    { value: "PENDING", label: "Pending" },
    { value: "AWAITING_PAYMENT", label: "Awaiting Payment" },
    { value: "PAID", label: "Paid" },
  ];

  const financeOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  // Fetch cars for modal
  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/car");
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Fetch salespeople for modal
  const fetchSalespeople = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user");
      setSalespersonData(response.data);
    } catch (error) {
      console.error("Error fetching salespeople:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWarning("");

    try {
      const response = await axiosInstance.post("/api/v1/deal", formData);
      console.log("Deal created:", response);
      navigate(`/dealer/deal/${response.data.data.id}`);
    } catch (error) {
      console.error("Error creating deal:", error);
      setWarning("Error creating deal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCarDisplay = () => {
    if (!formData.carId) return "No vehicle selected";
    const car = carData.find((c) => c.id === formData.carId);
    return car ? `${car.make} ${car.model} (${car.year})` : "Vehicle not found";
  };

  const getSelectedSalespersonDisplay = () => {
    if (!formData.salespersonId) return "No salesperson selected";
    const salesperson = salespersonData.find(
      (s) => s.id === formData.salespersonId
    );
    return salesperson
      ? `${salesperson.firstName} ${salesperson.lastName}`
      : "Salesperson not found";
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={DealerNavLinks.deals} />
        <div className={generalStyles["content-container"]}>
          <h1>Create Deal</h1>
          {warning && <Warning message={warning} />}
          <form onSubmit={handleSubmit}>
            {/* Vehicle Selection */}
            <div className={generalStyles["section"]}>
              <h2>Vehicle Details</h2>
              <div className={generalStyles["form-group"]}>
                <label>Vehicle</label>
                <div className={generalStyles["selected-value"]}>
                  {getSelectedCarDisplay()}
                </div>
                <button
                  type="button"
                  className={generalStyles["button-primary"]}
                  onClick={() => {
                    fetchCars();
                    setCarModalOpen(true);
                  }}
                >
                  Select Vehicle
                </button>
              </div>
            </div>

            {/* Salesperson Selection */}
            <div className={generalStyles["section"]}>
              <h2>Salesperson Details</h2>
              <div className={generalStyles["form-group"]}>
                <label>Salesperson</label>
                <div className={generalStyles["selected-value"]}>
                  {getSelectedSalespersonDisplay()}
                </div>
                <button
                  type="button"
                  className={generalStyles["button-primary"]}
                  onClick={() => {
                    fetchSalespeople();
                    setSalespersonModalOpen(true);
                  }}
                >
                  Select Salesperson
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className={generalStyles["section"]}>
              <h2>Customer Details</h2>
              <div className={generalStyles["form-grid"]}>
                <TextInput
                  label="Customer First Name"
                  name="customerFirstName"
                  type="text"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
                <TextInput
                  label="Customer Last Name"
                  name="customerLastName"
                  type="text"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
                <TextInput
                  label="Customer Email"
                  name="customerEmail"
                  type="email"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
                <TextInput
                  label="Customer Number"
                  name="customerNumber"
                  type="tel"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
              </div>
            </div>

            {/* Deal Details */}
            <div className={generalStyles["section"]}>
              <h2>Deal Details</h2>
              <div className={generalStyles["form-grid"]}>
                <TextInput
                  label="Deal Date"
                  name="dealDate"
                  type="date"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
                <TextInput
                  label="Pickup Date"
                  name="pickupDate"
                  type="date"
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextInput
                  label="Agreed Price"
                  name="agreedPrice"
                  type="number"
                  formData={formData}
                  setFormData={setFormData}
                  required
                />
                <TextInput
                  label="Deposit"
                  name="deposit"
                  type="number"
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextInput
                  label="Balance"
                  name="balance"
                  type="number"
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
                <SelectInput
                  label="Finance"
                  name="finance"
                  options={financeOptions}
                  formData={formData}
                  setFormData={setFormData}
                />
                <SelectInput
                  label="Finance Status"
                  name="financeStatus"
                  options={financeStatusOptions}
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextInput
                  label="Finance Amount"
                  name="financeAmount"
                  type="number"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>

            <div className={generalStyles["form-button-container"]}>
              <button
                type="submit"
                className={generalStyles["button-primary"]}
                disabled={loading}
              >
                {loading ? <Loader /> : "Create Deal"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Car Selection Modal */}
      <RecordSelectorModal
        isOpen={carModalOpen}
        setIsOpen={setCarModalOpen}
        url="/api/v1/car"
        name="carId"
        displayFields={["make", "model", "year", "registration", "price"]}
        searchFields={["make", "model", "year", "registration"]}
        data={formData}
        setData={setFormData}
        title="Select Car"
      />

      {/* Salesperson Selection Modal */}
      <RecordSelectorModal
        isOpen={salespersonModalOpen}
        setIsOpen={setSalespersonModalOpen}
        url="/api/v1/user"
        name="salespersonId"
        displayFields={["firstName", "lastName", "email"]}
        searchFields={["firstName", "lastName", "email"]}
        data={formData}
        setData={setFormData}
        title="Select Salesperson"
      />
    </div>
  );
}

export default CreateDealPage;
