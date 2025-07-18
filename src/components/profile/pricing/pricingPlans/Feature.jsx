import React from "react";
import styles from "./Feature.module.css";

export default function Feature({ text, icon, multiline = false }) {
  return (
    <div className={multiline ? styles.featureMultiline : styles.feature}>
      <img src={icon} alt="" className={styles.icon} />

      <div className={styles.text}>{text}</div>
    </div>
  );
}
