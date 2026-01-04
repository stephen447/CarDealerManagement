import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./SalesPersonPage.module.css";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import TextInput from "../../../General/Component/TextInput/TextInput";
import axiosInstance from "../../../General/Other/AxiosInstance";

function SalesPersonPage() {
  const { id } = useParams();
  const [salesPerson, setSalesPerson] = useState(null);
  const [tempSalesPerson, setTempSalesPerson] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // fetch sales person data on load
  useEffect(() => {
    // ToDo Fetch from the db
    axiosInstance.get(`/api/v1/user/${id}`).then((response) => {
      console.log(response.data);
      setSalesPerson({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      });
      setTempSalesPerson({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      });
    });
  }, [id]);

  const handleSave = () => {
    // ToDo Save to the db
    axiosInstance
      .put(`/api/v1/user/${id}`, tempSalesPerson)
      .then((response) => {
        console.log(response.data);
        setSalesPerson({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
        setEditMode(false);
      });
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
                label="First Name"
                name="firstName"
                type="text"
                formData={tempSalesPerson}
                setFormData={setTempSalesPerson}
              />
              <TextInput
                label="Last Name"
                name="lastName"
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
              <p>First Name: {salesPerson.firstName}</p>
              <p>Last Name: {salesPerson.lastName}</p>
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
