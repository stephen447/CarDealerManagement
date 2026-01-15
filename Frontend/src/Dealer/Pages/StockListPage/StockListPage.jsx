import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import StockListItem from "../../Components/StockListItem/StockListItem";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Warning from "../../../General/Component/Warning/Warning";
import Loader from "../../../General/Component/Loader/Loader";
import SelectInput from "../../../General/Component/SelectInput/SelectInput";

function StockListPage() {
  const navLinks = DealerNavLinks.stock;
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [sortBy, setSortBy] = useState("make-asc");
  const [sortedStockData, setSortedStockData] = useState([]);

  const sortOptions = [
    { value: "make-asc", label: "Make (A-Z)" },
    { value: "make-desc", label: "Make (Z-A)" },
    { value: "model-asc", label: "Model (A-Z)" },
    { value: "model-desc", label: "Model (Z-A)" },
    { value: "year-asc", label: "Year (Oldest)" },
    { value: "year-desc", label: "Year (Newest)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
  ];

  const sortStockData = (data, sortOption) => {
    const sortedData = [...data];
    console.log("sortOption", sortOption);
    switch (sortOption) {
      case "make-asc":
        return sortedData.sort((a, b) =>
          (a.make || "").localeCompare(b.make || "")
        );
      case "make-desc":
        return sortedData.sort((a, b) =>
          (b.make || "").localeCompare(a.make || "")
        );
      case "model-asc":
        return sortedData.sort((a, b) =>
          (a.model || "").localeCompare(b.model || "")
        );
      case "model-desc":
        return sortedData.sort((a, b) =>
          (b.model || "").localeCompare(a.model || "")
        );
      case "year-asc":
        return sortedData.sort((a, b) => (a.year || 0) - (b.year || 0));
      case "year-desc":
        return sortedData.sort((a, b) => (b.year || 0) - (a.year || 0));
      case "price-asc":
        return sortedData.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-desc":
        return sortedData.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return sortedData;
    }
  };

  useEffect(() => {
    async function apicall() {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/v1/car");
        console.log(response.data);
        setStockData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setWarning("Error fetching stock");
        setLoading(false);
      }
    }
    apicall();
  }, []);

  // const sortedStockData = sortStockData(stockData, sortBy);

  useEffect(() => {
    console.log("stockData", stockData);
    const sortedData = sortStockData(stockData, sortBy.sortBy);
    setSortedStockData(sortedData);
    console.log("sortedData", sortedData);
  }, [stockData, sortBy.sortBy]);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navLinks} />
        <div className={generalStyles["content-container"]}>
          <h1>Stock List</h1>
          <SelectInput
            label="Sort by"
            name="sortBy"
            value={sortBy}
            setFormData={setSortBy}
            formData={sortBy}
            options={sortOptions}
          />
          {loading ? (
            <Loader />
          ) : warning ? (
            <Warning message={warning} />
          ) : (
            sortedStockData.map((item) => (
              <StockListItem key={item.id} item={item} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
export default StockListPage;
