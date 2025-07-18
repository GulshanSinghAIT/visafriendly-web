import React from "react";
import styles from "./NavigationLinks.module.css";

const navigationItems = [
  { id: 1, text: "All Jobs", width: "4.53vw" },
  { id: 2, text: "H-1B Jobs", width: "5.26vw" },
  { id: 3, text: "Cap-Exempt Jobs", width: "10.52vw" },
];

export function NavigationLinks() {
  return (
    <nav className={styles.navigation} role="navigation">
      {navigationItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.text.toLowerCase().replace(/\s+/g, "-")}`}
          className={styles.navLink}
          // style={{ width: item.width }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
