import React from "react";
import styles from "./CategoryCard.module.css";

export function CategoryCard({ title, icon, iconAlt }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.iconWrapper}>
        <img loading="lazy" src={icon} alt={iconAlt} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
