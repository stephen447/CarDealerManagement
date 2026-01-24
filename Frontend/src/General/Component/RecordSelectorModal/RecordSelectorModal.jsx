import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./RecordSelectorModal.module.css";
import axiosInstance from "../../Other/AxiosInstance";
import generalStyles from "../../Other/GeneralStyles.module.css";

function RecordSelectorModal({
  isOpen,
  setIsOpen,
  displayFields,
  searchFields,
  name,
  url,
  data,
  setData,
  title,
  updatedObject,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function apiCall() {
      try {
        const response = await axiosInstance.get("http://localhost:3000" + url);
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    apiCall();
    console.log(records);
  }, []);

  // Filter the records whenever the searchterm,
  useEffect(() => {
    const filtered = records.filter((record) =>
      searchFields.some((field) =>
        record[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  }, [searchTerm, records, name]);

  // Dont display the modal if it is not open
  if (!isOpen) return null;

  const handleRecordSelect = (record) => {
    console.log(record, name, data, updatedObject);
    setData({
      ...data,
      [name]: record["id"],
    });
    if (updatedObject) {
      setData({
        ...data,
        [updatedObject]: record,
      });
    }
    onClose();
  };

  // Close the modal when the backdrop is clicked - attached to the backdrop div - target is the backdrop div.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSearchTerm("");
      onClose();
    }
  };

  function onClose() {
    setIsOpen(false);
    setSearchTerm("");
  }

  return (
    <div className={styles["modal-backdrop"]} onClick={handleBackdropClick}>
      <div className={styles["modal-content"]}>
        {/* Modal Header */}
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <button
            className={generalStyles["button-primary"]}
            onClick={() => {
              onClose();
              setSearchTerm("");
            }}
          >
            Close
          </button>
        </div>

        {/* Search Container */}
        <div className={styles["search-container"]}>
          <input
            type="text"
            placeholder="Search For Records"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        {/*  */}
        <div className={styles["records-list"]}>
          {loading ? (
            <div className={generalStyles["content-container"]}>
              <Loader />
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className={generalStyles["no-records"]}>
              {searchTerm
                ? "No records found matching your search"
                : "No records available"}
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className={styles["record-item"]}
                onClick={() => handleRecordSelect(record)}
              >
                {displayFields.map((field) => (
                  <p>{record[field]}</p>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordSelectorModal;
