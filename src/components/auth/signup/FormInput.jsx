import React from "react";
import styles from "./Signup.module.css";

export const FormInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ''}`}>
        <input
          type={type}
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={label}
        />
      </div>
    </div>
  );
};
