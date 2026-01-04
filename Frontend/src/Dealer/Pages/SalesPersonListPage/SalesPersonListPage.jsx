import Header from "../../Components/Header/Header";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import ListItem from "../../../General/Component/ListItem/ListItem";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import { useEffect, useState } from "react";
import axiosInstance from "../../../General/Other/AxiosInstance";
import Loader from "../../../General/Component/Loader/Loader";
import Warning from "../../../General/Component/Warning/Warning";

function SalespersonPage() {
  const [salesPeople, setSalesPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const navItems = DealerNavLinks.salesPeople;

  useEffect(() => {
    async function apiCall() {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/v1/user");
        setSalesPeople(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching salespeople", error);
        setLoading(false);
        setWarning("Error fetching salespeople");
      }
    }
    apiCall();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header />

      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navItems} />
        <div className={generalStyles["content-container"]}>
          <h1>Sales People</h1>
          {loading ? (
            <Loader />
          ) : warning ? (
            <Warning message={warning} />
          ) : (
            salesPeople.map((item) => (
              <ListItem
                key={item.id}
                title={item.firstName + " " + item.lastName}
                url={`/dealer/salesPerson/${item.id}`}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default SalespersonPage;
