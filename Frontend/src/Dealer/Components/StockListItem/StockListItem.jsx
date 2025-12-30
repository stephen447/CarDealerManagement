import styles from "./StockListItem.module.css";
import { formatNumberToPrice } from "../../../General/Other/GeneralFunctions";
import { useNavigate } from "react-router-dom";

function StockListItem({ item }) {
  const navigate = useNavigate();
  return (
    <button
      className={styles["stock-list-item"]}
      onClick={() => navigate(`/dealer/stock/${item.id}`)}
    >
      <div className={styles["column"]}>
        <h1>{item.year}</h1>
        <h1>{item.make}</h1>
        <h1>{item.model}</h1>
      </div>
      <div className={styles["column"]}>
        {item.registration && <p>Registration: {item.registration}</p>}
        {item.price && <p>Price: {formatNumberToPrice(item.price)}</p>}
      </div>
    </button>
  );
}

export default StockListItem;
