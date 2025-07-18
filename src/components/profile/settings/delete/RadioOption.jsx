import React from "react";
import styles from "./RadioOption.module.css";

export function RadioOption({ isSelected, text, onChange, id }) {
  const handleClick = () => {
    onChange(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(id);
    }
  };

  return (
    <div className={styles.optionWrapper}>
      <div
        className={styles.radioButton}
        role="radio"
        aria-checked={isSelected}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        aria-label={`Select option: ${text}`}
      >
        <div
          className={isSelected ? styles.containerSelected : styles.container}
        >
          {isSelected && <div className={styles.circle} />}
        </div>
      </div>
      <label 
        htmlFor={`radio-${id}`} 
        className={styles.optionText}
        onClick={handleClick}
      >
        {text}
      </label>
    </div>
  );
}
