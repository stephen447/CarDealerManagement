import { Route, Routes } from "react-router-dom";

function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<div>Admin App</div>} />
    </Routes>
  );
}

export default AdminApp;
