import { useState } from "react";
import Header from "../../Components/Header";
import styles from "./CreateSalesPersonPage.module.css";
import TextInput from "../../../General/Component/TextInput/TextInput";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";

function CreateSalesPersonPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      <main className={styles["page-container"]}>
        <SidebarNav
          items={[
            { label: "Sales People", path: "/test" },
            { label: "Create Sale Person", path: "/dealer/createSalesPerson" },
          ]}
        />
        <div className={styles["main-container"]}>
          <h1>Create Sales Person</h1>
          <form className={styles["salesperson-form"]} onSubmit={handleSubmit}>
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

            <button type="submit">Create Sales Person</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateSalesPersonPage;
