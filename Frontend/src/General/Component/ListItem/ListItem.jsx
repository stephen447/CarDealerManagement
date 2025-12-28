import { useNavigate } from "react-router-dom";
import styles from "./ListItem.module.css";

function ListItem({ title, url }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(url)} className={styles["list-item"]}>
      {title}
    </button>
  );
}

export default ListItem;
