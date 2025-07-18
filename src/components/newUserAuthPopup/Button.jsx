import React from "react";
import styles from "./Button.module.css";

export const Button = ({ variant = "default", children, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      tabIndex={0}
    >
      {children}
    </button>
  );
};
