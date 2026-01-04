import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./SalesPersonPage.module.css";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import TextInput from "../../../General/Component/TextInput/TextInput";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Loader from "../../../General/Component/Loader/Loader";
import Warning from "../../../General/Component/Warning/Warning";

function SalesPersonPage() {
  const { id } = useParams();
  const [salesPerson, setSalesPerson] = useState(null);
  const [tempSalesPerson, setTempSalesPerson] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateWarning, setUpdateWarning] = useState("");

  // fetch sales person data on load
  useEffect(() => {
    async function apiCall() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/user/${id}`);
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setWarning("Error fetching salesperson");
        setLoading(false);
      }
    }
    apiCall();
  }, [id]);

  const handleSave = async () => {
    try {
      setUpdateLoading(true);
      const response = await axiosInstance.put(
        `/api/v1/user/${id}`,
        tempSalesPerson
      );
      console.log(response.data);
      setSalesPerson({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      });
      setUpdateLoading(false);
      setEditMode(false);
    } catch (error) {
      console.error(error);
      setUpdateWarning("Error updating salesperson");
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempSalesPerson(salesPerson);
    setUpdateWarning("");
  };

  return (
    <div>
      <Header />
      <main className={generalStyles["main-container"]}>
        {loading ? (
          <div className={generalStyles["content-container"]}>
            <Loader />
          </div>
        ) : warning ? (
          <div className={generalStyles["content-container"]}>
            <Warning message={warning} />
          </div>
        ) : editMode ? (
          <div className={generalStyles["content-container"]}>
            {updateLoading ? (
              <Loader />
            ) : (
              <>
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
                    onClick={handleCancel}
                    className={generalStyles["button-primary"]}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={generalStyles["button-primary"]}
                  >
                    Save
                  </button>
                </div>
                {updateWarning && <Warning message={updateWarning} />}
              </>
            )}
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
        )}
      </main>
    </div>
  );
}

export default SalesPersonPage;
