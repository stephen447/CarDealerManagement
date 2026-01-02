import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login/Login";
import CreateSalesPersonPage from "./Pages/CreateSalesPersonPage/CreateSalesPersonPage";
import SalesPersonListPage from "./Pages/SalesPersonListPage/SalesPersonListPage";
import SalesPersonPage from "./Pages/SalesPersonPage/SalesPersonPage";
import HomePage from "./Pages/HomePage/HomePage";
import StockListPage from "./Pages/StockListPage/StockListPage";
import StockPage from "./Pages/StockPage/StockPage";
import CreateStockPage from "./Pages/CreateStockPage/CreateStockPage";
import DealsListPage from "./Pages/DealsListPage/DealsListPage";
import DealPage from "./Pages/DealPage/DealPage";

function DealerApp() {
  // ToDo Get data from API and store here locally - options for dropsdowns - makes, models, statuses, stockdata [Page1], save the dealer ID,
  return (
    <Routes>
      <Route path="login" element={<Login userType={"dealer"} />} />
      <Route path="home" element={<HomePage />} />
      <Route path="createSalesPerson" element={<CreateSalesPersonPage />} />
      <Route path="salesPersonList" element={<SalesPersonListPage />} />
      <Route path="salesPerson/:id" element={<SalesPersonPage />} />
      <Route path="stock" element={<StockListPage />} />
      <Route path="stock/:id" element={<StockPage />} />
      <Route path="createStock" element={<CreateStockPage />} />
      <Route path="deals" element={<DealsListPage />} />
      <Route path="deal/:id" element={<DealPage />} />
    </Routes>
  );
}

export default DealerApp;
