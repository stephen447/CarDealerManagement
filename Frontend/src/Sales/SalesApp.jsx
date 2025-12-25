import { Route, Routes } from "react-router-dom";

function SalesApp() {
  return (
    <Routes>
      <Route path="login" element={<div>Sales App</div>} />
    </Routes>
  );
}

export default SalesApp;
