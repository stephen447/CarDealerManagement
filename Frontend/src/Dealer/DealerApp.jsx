import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login/Login";
import CreateSalesPersonPage from "./Pages/CreateSalesPersonPage";

function DealerApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"dealer"} />} />
      <Route path="createSalesPerson" element={<CreateSalesPersonPage />} />
    </Routes>
  );
}

export default DealerApp;
