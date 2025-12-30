import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles["home-container"]}>
      <h1> Car Management System</h1>
      <div className={styles["button-container"]}>
        <button onClick={() => navigate("/dealer/salesPersonList")}>
          <h2>Sales People</h2>
        </button>
        <button onClick={() => navigate("/dealer/stock")}>
          <h2>Stock</h2>
        </button>
        <button onClick={() => navigate("/dealer/deals")}>
          <h2>Deals</h2>
        </button>
        <button onClick={() => navigate("/dealer/settings")}>
          <h2>Settings</h2>
        </button>
      </div>
    </div>
  );
}
export default HomePage;
