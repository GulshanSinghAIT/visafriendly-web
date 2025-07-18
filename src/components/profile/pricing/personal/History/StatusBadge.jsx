import React from "react";
import styles from "./PaymentHistory.module.css";

export const StatusBadge = ({ status }) => {
  const badgeClass =
    status === "Pending" ? styles.badgePending : styles.badgePaid;

  return <div className={`${styles.badge} ${badgeClass}`}>{status}</div>;
};
