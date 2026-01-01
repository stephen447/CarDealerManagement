import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks";
import StockListItem from "../../Components/StockListItem/StockListItem";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";

function StockListPage() {
  const navLinks = DealerNavLinks.stock;
  /*
id        String   @id @default(uuid())
  make      String
  model     String
  year      Int
  description String?
  registration String
  price     Int
  dealerId  String
  dealer    Dealer   @relation(fields: [dealerId], references: [id])
  buyInDate DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  status    CarStatus @default(DUEIN)
  deal Deal[]
*/
  const testData = [
    {
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      description: "",
      registration: "201-D-123",
      price: 10000,
      dealerId: "",
      dealer: "",
      buyInDate: "",
      createdAt: "",
      updatedAt: "",
      status: "DUEIN",
      deal: "",
    },
  ];
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navLinks} />
        <div className={generalStyles["content-container"]}>
          <h1>Stock List</h1>
          {testData.map((item) => (
            <StockListItem item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
export default StockListPage;
