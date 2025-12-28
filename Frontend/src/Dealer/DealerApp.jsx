import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login/Login";
import CreateSalesPersonPage from "./Pages/CreateSalesPersonPage/CreateSalesPersonPage";
import SalespersonPage from "./Pages/SalesPersonPage/SalesPersonPage";

function DealerApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"dealer"} />} />
      <Route path="createSalesPerson" element={<CreateSalesPersonPage />} />
      <Route path="salesPerson" element={<SalespersonPage />} />
    </Routes>
  );
}

export default DealerApp;
