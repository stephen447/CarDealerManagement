import { Route, Routes } from "react-router-dom";
import Login from "../General/Component/Login";

function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login userType={"admin"} />} />
    </Routes>
  );
}

export default AdminApp;
