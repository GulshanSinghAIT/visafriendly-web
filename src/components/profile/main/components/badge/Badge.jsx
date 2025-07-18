"use client";
import React from "react";
import styles from "./Badge.module.css";

const Badge = ({ text, icon = true, selected = false }) => {
  return (
    <div className={styles.badgeAndTag} role="status" aria-label={text}>
      {icon && (
        <span className={styles.inline}>
          <span
            className={`${styles.icon} ${selected ? styles.selected : ""}`}
            aria-hidden="true"
          />
        </span>
      )}
      <span className={styles.placeholder}>{text}</span>
    </div>
  );
};

export default Badge;
