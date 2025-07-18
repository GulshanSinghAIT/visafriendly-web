import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuItem } from "./MenuItem.tsx";
import { MENU_ITEMS } from "./constants.ts";
import styles from "./SettingsMenu.module.css";

export const SettingsMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set active item based on the current URL
    const currentItem = MENU_ITEMS.find((item) => location.pathname.includes(item.id));
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(`/settings/${item.id}`);
  };

  return (
    <nav className={styles.container} aria-label="Settings navigation">
      <div className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <p className={styles.subtitle}>Manage your account preferences</p>
      </div>

      <div className={styles.menuWrapper}>
        <ul className={styles.menuList} role="menu" aria-orientation="vertical">
          {MENU_ITEMS.map((item, index) => (
            <li key={item.id} className={styles.menuItemContainer}>
              <MenuItem
                {...item}
                isLast={index === MENU_ITEMS.length - 1}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
