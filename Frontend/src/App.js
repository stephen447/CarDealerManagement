import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DealerApp from "./Dealer/DealerApp";
import SalesApp from "./Sales/SalesApp";
import AdminApp from "./Admin/AdminApp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Nested routes - use /* to allow child routes */}
          <Route path="/dealer/*" element={<DealerApp />} />
          <Route path="/sales/*" element={<SalesApp />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
