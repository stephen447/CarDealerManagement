import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./SideBarNav.module.css";

const SidebarNav = ({ items }) => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className={styles["sidebar-nav-container"]}>
      <nav>
        <ul className={styles["sidebar-nav-list"]}>
          {items.map((item) => (
            <li key={item.path} className={styles["sidebar-nav-li"]}>
              <NavLink
                to={item.path}
                className={
                  activePath === item.path
                    ? styles["sidebar-nav-item-active"]
                    : styles["sidebar-nav-item"]
                }
              >
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
