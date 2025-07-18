import React from "react";
import styles from "./FormFields.module.css";

// InputField.jsx
export const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};
