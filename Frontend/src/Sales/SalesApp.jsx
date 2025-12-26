import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login";

function SalesApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"sales"} />} />
    </Routes>
  );
}

export default SalesApp;
