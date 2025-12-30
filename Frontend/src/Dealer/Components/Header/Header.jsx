import { useNavigate } from "react-router-dom";
import "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <button onClick={() => navigate("/dealer/home")}>Home</button>
        <button onClick={() => navigate("/dealer/salesPersonList")}>
          SalesPeople
        </button>
        <button onClick={() => navigate("/dealer/stock")}>Stock</button>
        <button onClick={() => navigate("/dealer/deals")}>Deals</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
      </nav>
    </header>
  );
};

export default Header;
