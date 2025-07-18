import React from "react";
import styles from "./FormInput.module.css";

export const FormInput = ({
  label,
  value,
  id,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.error : ''}`}>
        <input
          type={type}
          id={id}
          className={styles.input}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <div id={`${id}-error`} className={styles.errorMessage}>
          <svg className={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};
