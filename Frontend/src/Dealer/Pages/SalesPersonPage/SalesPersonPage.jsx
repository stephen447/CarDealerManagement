import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./SalesPersonPage.module.css";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import TextInput from "../../../General/Component/TextInput/TextInput";

function SalesPersonPage() {
  const { id } = useParams();
  const [salesPerson, setSalesPerson] = useState(null);
  const [tempSalesPerson, setTempSalesPerson] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // fetch sales person data on load
  useEffect(() => {
    // ToDo Fetch from the db

    setSalesPerson({
      name: "Stephen Byrne",
      email: "stephen.byrne@caradverts.com",
    });
    setTempSalesPerson({
      name: "Stephen Byrne",
      email: "stephen.byrne@caradverts.com",
    });
  }, [id]);

  const handleSave = () => {
    // ToDo Save to the db
    setSalesPerson(tempSalesPerson);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempSalesPerson(salesPerson);
  };

  return (
    <div>
      <Header />
      <main className={generalStyles["main-container"]}>
        {salesPerson !== null ? (
          editMode ? (
            <div className={generalStyles["content-container"]}>
              <TextInput
                label="Name"
                name="name"
                type="text"
                formData={tempSalesPerson}
                setFormData={setTempSalesPerson}
              />
              <TextInput
                label="Email"
                name="email"
                type="email"
                formData={tempSalesPerson}
                setFormData={setTempSalesPerson}
              />
              <div className={styles["button-container"]}>
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
          ) : (
            <div className={generalStyles["content-container"]}>
              <p>Name: {salesPerson.name}</p>
              <p>Email: {salesPerson.email}</p>
              <div className={styles["button-container"]}>
                <button
                  onClick={() => setEditMode(true)}
                  className={generalStyles["button-primary"]}
                >
                  Edit
                </button>
              </div>
            </div>
          )
        ) : (
          <h1 className={styles["loading"]}>Loading...</h1>
        )}
      </main>
    </div>
  );
}

export default SalesPersonPage;
