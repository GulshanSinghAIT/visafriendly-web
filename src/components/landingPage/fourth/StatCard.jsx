import React from "react";
import styles from "./Stats.module.css";

export const StatCard = ({ percentage, title, description }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statContent}>
        <div className={styles.statInfo}>
          <div className={styles.percentage}>{percentage}</div>
          <div className={styles.statTitle}>{title}</div>
          <div className={styles.statDescription}>{description}</div>
        </div>
      </div>
    </div>
  );
};
