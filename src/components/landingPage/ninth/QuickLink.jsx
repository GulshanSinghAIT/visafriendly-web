import React from "react";
import styles from "./Footer.module.css";

export const QuickLink = ({ text, href }) => (
  <a href={href} className={styles.quickLink}>
    {text}
  </a>
);
