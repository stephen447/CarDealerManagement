import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./SideBarNav.module.css";

const SidebarNav = ({ items }) => {
  const location = useLocation();
  const activePath = location.pathname;

  // Initialize state based on screen size or saved preference
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check if we have a saved preference
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      return JSON.parse(saved);
    }

    // Default to collapsed on screens smaller than 768px
    return window.innerWidth < 768;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`${styles["sidebar-nav-container"]} ${
        isCollapsed ? styles["collapsed"] : ""
      }`}
    >
      <button
        className={styles["sidebar-toggle"]}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? "→" : "←"}
      </button>
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
                title={isCollapsed ? item.label : undefined}
              >
                {isCollapsed ? (
                  <span className={styles["nav-icon"]}>
                    {item.label.charAt(0)}
                  </span>
                ) : (
                  item.label
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
