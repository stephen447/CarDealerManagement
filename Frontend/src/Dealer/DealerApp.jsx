import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login/Login";
import CreateSalesPersonPage from "./Pages/CreateSalesPersonPage/CreateSalesPersonPage";
import SalesPersonListPage from "./Pages/SalesPersonListPage/SalesPersonListPage";
import SalesPersonPage from "./Pages/SalesPersonPage/SalesPersonPage";
import HomePage from "./Pages/HomePage/HomePage";

function DealerApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"dealer"} />} />
      <Route path="home" element={<HomePage />} />
      <Route path="createSalesPerson" element={<CreateSalesPersonPage />} />
      <Route path="salesPersonList" element={<SalesPersonListPage />} />
      <Route path="salesPerson/:id" element={<SalesPersonPage />} />
    </Routes>
  );
}

export default DealerApp;
