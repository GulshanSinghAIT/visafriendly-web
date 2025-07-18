import React from "react";
import styles from "./Button.module.css";

const Button = ({ variant = "outline", children, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[`button-${variant}`]}`}
      onClick={onClick}
      tabIndex={0}
    >
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};

export default Button;
