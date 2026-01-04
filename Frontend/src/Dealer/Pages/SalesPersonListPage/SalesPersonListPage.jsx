import Header from "../../Components/Header/Header";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import ListItem from "../../../General/Component/ListItem/ListItem";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import { useEffect, useState } from "react";
import axiosInstance from "../../../General/Other/AxiosInstance";

function SalespersonPage() {
  const testData = [
    { name: "Stephen Byrne", id: 1 },
    { name: "John Doe", id: 2 },
  ];
  const [salesPeople, setSalesPeople] = useState([]);
  const navItems = DealerNavLinks.salesPeople;

  useEffect(() => {
    axiosInstance.get("/api/v1/user").then((response) => {
      console.log(response.data);
      setSalesPeople(response.data);
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header />

      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navItems} />
        <div className={generalStyles["content-container"]}>
          <h1>Sales People</h1>
          {salesPeople.map((item) => (
            <ListItem
              key={item.id}
              title={item.firstName + " " + item.lastName}
              url={`/dealer/salesPerson/${item.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default SalespersonPage;
