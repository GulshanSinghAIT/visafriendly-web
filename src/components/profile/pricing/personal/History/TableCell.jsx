import React from "react";
import styles from "./PaymentHistory.module.css";

export const TableCell = ({ children, className = "" }) => (
  <div className={`${styles.cell} ${className}`}>{children}</div>
);
