import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
