import React from "react";
import styles from "./NavigationItem.module.css";

export function NavigationItem({ title, icon, isActive, onClick }) {
  const activeIcon = icon;
  const inactiveIcon = icon;

  return (
    <div className={styles.navItem}>
      <div
        className={`${styles.navLink} ${
          isActive ? styles.navLinkActive : styles.navLinkInactive
        }`}
        onClick={onClick}
      >
        <div className={styles.content}>
          <div className={styles.inline}>
            <div
              className={`${styles.icon} ${isActive ? styles.iconActive : ""}`}
            >
              <img
                loading="lazy"
                src={isActive ? activeIcon : inactiveIcon} // Use the active/inactive icon
                alt=""
                className={styles.iconImage}
              />
            </div>
            <div
              className={`${styles.title} ${
                isActive ? styles.titleActive : styles.titleInactive
              }`}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
