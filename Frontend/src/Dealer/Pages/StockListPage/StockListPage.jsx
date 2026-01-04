import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import StockListItem from "../../Components/StockListItem/StockListItem";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../General/Other/AxiosInstance";

function StockListPage() {
  const navLinks = DealerNavLinks.stock;

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/v1/car").then((response) => {
      console.log(response.data);
      setStockData(response.data);
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navLinks} />
        <div className={generalStyles["content-container"]}>
          <h1>Stock List</h1>
          {stockData.map((item) => (
            <StockListItem item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
export default StockListPage;
