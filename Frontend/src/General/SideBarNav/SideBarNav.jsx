import { NavLink } from "react-router-dom";
import styles from "./SideBarNav.module.css";

const SidebarNav = ({ items }) => {
  return (
    <aside className={styles["sidebar-nav-container"]}>
      <nav>
        <ul className={styles["sidebar-nav-list"]}>
          {items.map((item) => (
            <li key={item.path} className={styles["sidebar-nav-li"]}>
              <NavLink to={item.path} className={styles["sidebar-nav-item"]}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
