import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login";

function DealerApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"dealer"} />} />
    </Routes>
  );
}

export default DealerApp;
