import { useNavigate } from "react-router-dom";
import "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/salespeople")}>SalesPeople</button>
        <button onClick={() => navigate("/stock")}>Stock</button>
        <button onClick={() => navigate("/deals")}>Deals</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
      </nav>
    </header>
  );
};

export default Header;
