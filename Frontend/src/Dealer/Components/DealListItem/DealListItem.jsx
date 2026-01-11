import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import styles from "./DealListItem.module.css";
import {
  formatNumberToPrice,
  formatDateString,
} from "../../../General/Other/GeneralFunctions";
import { useNavigate } from "react-router-dom";

function DealListItem({ deal }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/deal/${deal.id}`);
  }
  function handleSalespersonClick() {
    navigate(`/dealer/salesPerson/${deal.salesperson.id}`);
  }

  // ToDo: Add filtering options
  // ToDo: Add sorting options
  // ToDo: Add pagination
  // ToDo: Add search options
  return (
    <div>
      <button className={generalStyles["button-primary"]} onClick={handleClick}>
        <div className={styles["deal-list-item"]}>
          <div className={styles["deal-list-item-row"]}>
            <h2>{deal.car.make}</h2>
            <h2>{deal.car.model}</h2>
            <h2>{deal.car.year}</h2>
          </div>

          <div className={styles["deal-list-item-row"]}>
            <p>{deal.car.registration}</p>
            <p>{formatDateString(deal.dealDate)}</p>
            <p>{formatNumberToPrice(deal.agreedPrice)}</p>
          </div>
          <div className={styles["deal-list-item-row"]}>
            <p>
              Salesperson:{" "}
              <button onClick={handleSalespersonClick}>
                {deal.salesperson.firstName + " " + deal.salesperson.lastName}
              </button>
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
export default DealListItem;
