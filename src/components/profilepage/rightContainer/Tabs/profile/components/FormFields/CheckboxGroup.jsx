import React from "react";
import styles from "./FormFields.module.css";

export const CheckboxGroup = ({
  legend,
  name,
  options,
  selectedValues,
  onChange,
  required,
  error,
}) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        {legend}
        {required && <span className={styles.required}>*</span>}
      </legend>
      <div className={styles.checkboxGroup}>
        {options.map(({ id, label }) => (
          <label key={id} className={styles.checkbox}>
            <input
              type="checkbox"
              name={name}
              value={id}
              checked={selectedValues.includes(id)}
              onChange={onChange}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxLabel}>{label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </fieldset>
  );
};
