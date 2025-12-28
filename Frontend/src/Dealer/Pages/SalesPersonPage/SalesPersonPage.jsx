import Header from "../../Components/Header";
import styles from "./SalesPersonPage.module.css";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import ListItem from "../../../General/Component/ListItem/ListItem";

function SalespersonPage() {
  const testData = [
    { name: "Stephen Byrne", id: 1 },
    { name: "John Doe", id: 2 },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <Header />

      <main className={styles["page-container"]}>
        <SidebarNav
          items={[
            { label: "Sales People", path: "/dealer/salesPerson" },
            { label: "Create Sale Person", path: "/dealer/createSalesPerson" },
          ]}
        />
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
