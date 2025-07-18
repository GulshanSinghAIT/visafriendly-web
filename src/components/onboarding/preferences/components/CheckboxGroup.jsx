import React from "react";
import styles from "./CheckboxGroup.module.css";

export const CheckboxGroup = ({ options, selectedValues, onChange }) => {
  const handleChange = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className={styles.groupContainer}>
      {options.map((option) => (
        <label key={option.id} className={styles.checkbox}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={selectedValues.includes(option.id)}
            onChange={() => handleChange(option.id)}
          />
          <span className={styles.checkboxLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
