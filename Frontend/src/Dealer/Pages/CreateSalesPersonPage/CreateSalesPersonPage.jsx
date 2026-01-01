import { useState } from "react";
import Header from "../../Components/Header/Header";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";

function CreateSalesPersonPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navItems = DealerNavLinks.salesPeople;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with API call later
    console.log("Creating salesperson:", formData);

    // Optional: reset form
    setFormData({
      name: "",
      email: "",
      password: "",
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
              label={"Name"}
              name="name"
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
