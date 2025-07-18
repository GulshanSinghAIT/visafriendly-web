// FormInput.js
import React from "react";
import styles from "./FormInput.module.css";

export const FormInput = ({ label, value, id, onChange, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id={id}
          className={styles.input}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
        />
      </div>
    </div>
  );
};
