import React from "react";
import styles from "./Signup.module.css";

export const FormInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          value={value} // Bind value
          onChange={onChange} // Update on change
          aria-label={label}
          required
        />
      </div>
    </div>
  );
};
