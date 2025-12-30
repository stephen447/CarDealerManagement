import Header from "../../Components/Header";
import styles from "./SalesPersonListPage.module.css";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import ListItem from "../../../General/Component/ListItem/ListItem";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";

function SalespersonPage() {
  const testData = [
    { name: "Stephen Byrne", id: 1 },
    { name: "John Doe", id: 2 },
  ];
  console.log("DealerNavLinks", DealerNavLinks);
  const navItems = DealerNavLinks.salesPeople;

  return (
    <div style={{ height: "100vh" }}>
      <Header />

      <main className={styles["page-container"]}>
        <SidebarNav items={navItems} />
        <div className={styles["main-container"]}>
          {testData.map((item) => (
            <ListItem
              key={item.id}
              title={item.name}
              url={`/dealer/salesPerson/${item.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default SalespersonPage;
