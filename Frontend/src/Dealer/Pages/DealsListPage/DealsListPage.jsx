import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks.json";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useState, useEffect } from "react";
import DealListItem from "../../Components/DealListItem/DealListItem";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Loader from "../../../General/Component/Loader/Loader";
import Warning from "../../../General/Component/Warning/Warning";

function DealsListPage() {
  const navLinks = DealerNavLinks.deals;
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [dealsData, setDealsData] = useState([]);

  useEffect(() => {
    async function apiCall() {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/v1/deal");
        setDealsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals", error);
        setLoading(false);
        setWarning("Error fetching deals");
      }
    }
    apiCall();
  }, []);
  //

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navLinks} />
        {loading ? (
          <div className={generalStyles["content-container"]}>
            <Loader />
          </div>
        ) : warning ? (
          <div className={generalStyles["content-container"]}>
            <Warning message={warning} />
          </div>
        ) : (
          <div className={generalStyles["content-container"]}>
            <h1>Deals List Page</h1>
            <div className={generalStyles["form-grid"]}>
              {dealsData.map((deal) => (
                <DealListItem deal={deal} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DealsListPage;
