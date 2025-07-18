import React from "react";
import styles from "./FormFields.module.css";

// SelectField.jsx
export const SelectField = ({
  label,
  id,
  options,
  value,
  onChange,
  required,
  placeholder = "Enter Your Skills",
  error,
  className,
}) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={id}
        className={`${className}${styles.select} ${error ? styles.error : ""}`}
        value={value || ""}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map(({ id, label }) => (
          <option key={id} value={id} selected={value === id}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

export const SelectField_YEAR = ({
  label,
  id,
  options,
  value,
  onChange,
  required,
  placeholder = "Select Year of Experience",
  error,
}) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={id}
        className={`${styles.select} ${error ? styles.error : ""}`}
        value={value || ""}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map(({ id, label }) => (
          <option key={id} value={id} selected={value === id}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};
