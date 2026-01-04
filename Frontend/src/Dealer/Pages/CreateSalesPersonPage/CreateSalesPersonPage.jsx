import { useState } from "react";
import Header from "../../Components/Header/Header";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Loader from "../../../General/Component/Loader/Loader";
import Warning from "../../../General/Component/Warning/Warning";

function CreateSalesPersonPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "SALESPERSON",
    dealerId: "1234",
  });

  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const navItems = DealerNavLinks.salesPeople;

  /**
   * Function for sending a post request to the API to create a new salesperson in DB
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/user", formData);
      // Optional: reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "SALESPERSON",
        dealerId: "1234",
      });
      setLoading(false);
      // TODO:Could maybe redirect to the salesperson page
    } catch (error) {
      console.error("Error creating salesperson:", error);
      setLoading(false);
      setWarning("Error creating salesperson");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navItems} />
        <div className={generalStyles["content-container"]}>
          <h1>Create Sales Person</h1>
          <form className={generalStyles["form"]} onSubmit={handleSubmit}>
            <TextInput
              label={"First Name"}
              name="firstName"
              type={"text"}
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label={"Last Name"}
              name="lastName"
              type={"text"}
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label={"Email"}
              name="email"
              type={"email"}
              formData={formData}
              setFormData={setFormData}
            />
            <TextInput
              label={"Password"}
              name="password"
              type={"password"}
              formData={formData}
              setFormData={setFormData}
            />
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className={generalStyles["button-primary"]}>
                Create Sales Person
              </button>
            )}
            {warning && <Warning message={warning} />}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateSalesPersonPage;
