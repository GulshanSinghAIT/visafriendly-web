import React from "react";
import styles from "./FormInput.module.css";

export function FormInput({
  label,
  placeholder,
  type = "text",
  required,
  id,
  value,
  onChange,
}) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <input
          type={type}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-label={label}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
