import Header from "../../Components/Header/Header";
import SidebarNav from "../../../General/SideBarNav/SideBarNav";
import DealerNavLinks from "../../../General/Other/DealerNavLinks.json";
import generalStyles from "../../../General/Other/GeneralStyles.module.css";
import { useState } from "react";
import DealListItem from "../../Components/DealListItem/DealListItem";

function DealsListPage() {
  const navLinks = DealerNavLinks.deals;
  const testDealsData = [
    {
      id: "1",
      dealerId: "1",
      salespersonId: "1",
      salesperson: {
        name: "John Doe",
      },
      carId: "1",
      car: {
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        registration: "201-D-123",
      },
      agreedPrice: 23000,
      pickupDate: "",
      dealDate: "",
      deposit: 12000,
      balance: 13000,
      finance: true,
      financeStatus: "AWAITING PAYOUT",
      financeAmount: 13000,
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerNumber: "1234567890",
    },
  ];

  const [dealsData, setDealsData] = useState(testDealsData);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className={generalStyles["main-container"]}>
        <SidebarNav items={navLinks} />
        <div className={generalStyles["content-container"]}>
          <h1>Deals List Page</h1>
          {dealsData.map((deal) => (
            <DealListItem deal={deal} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default DealsListPage;
