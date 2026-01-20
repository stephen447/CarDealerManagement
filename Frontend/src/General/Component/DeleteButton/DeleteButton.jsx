import styles from "./DeleteButton.module.css";
import { useState } from "react";
import axiosInstance from "../../Other/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Warning from "../Warning/Warning";
import generalStyles from "../../Other/GeneralStyles.module.css";

function DeleteButton({ item, url, redirectUrl }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  async function handleConfirm() {
    try {
      setLoading(true);
      await axiosInstance.delete("http://localhost:3000/" + url);
      setIsModalOpen(false);
      setError(null);
      navigate(redirectUrl);
    } catch (error) {
      console.error(error);
      setError(`Error deleting ${item} record`);
      setLoading(false);
    }
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
      setError(null);
    }
  };

  return (
    <>
      <button
        className={generalStyles["button-red"]}
        onClick={handleButtonClick}
      >
        Delete
      </button>

      {isModalOpen && (
        <div className={styles["modal-backdrop"]} onClick={handleBackdropClick}>
          <div className={styles["modal-content"]}>
            <h2>Confirm Delete {item}</h2>
            <div>
              <div className={styles["modal-button-container"]}>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <button
                      onClick={handleClose}
                      className={generalStyles["button-primary"]}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className={generalStyles["button-red"]}
                    >
                      Confirm
                    </button>
                  </>
                )}
              </div>

              {error && <Warning message={error} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteButton;
