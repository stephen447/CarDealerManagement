import { useState } from "react";
import Header from "../../Components/Header/Header";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import axiosInstance from "../../../General/Other/AxiosInstance";

function CreateSalesPersonPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "SALESPERSON",
    dealerId: "1234",
  });
  const navItems = DealerNavLinks.salesPeople;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with API call later
    console.log("Creating salesperson:", formData);

    axiosInstance.post("/api/v1/user", formData).then((response) => {
      console.log(response.data);
    });

    // Optional: reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "SALESPERSON",
      dealerId: "1234",
    });
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

            <button type="submit" className={generalStyles["button-primary"]}>
              Create Sales Person
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateSalesPersonPage;
