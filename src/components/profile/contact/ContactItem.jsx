import React from "react";
import styles from "./ContactItem.module.css";

export function ContactItem({ icon, text, type }) {
  return (
    <div className={styles.contactItem}>
      <img
        loading="lazy"
        src={icon}
        alt={`${type} icon`}
        className={styles.contactIcon}
      />
      <div className={styles.contactText}>{text}</div>
    </div>
  );
}
