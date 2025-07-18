import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, onClick }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button
        className={styles.button}
        onClick={onClick}
        tabIndex="0"
        role="button"
      >
        {children}
      </button>
    </div>
  );
};
