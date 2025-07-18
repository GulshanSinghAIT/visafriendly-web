import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.css";

export const MultiSelectDropdown = ({ options, selectedValues, onChange, placeholder = "Select options..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionId) => {
    const newValues = selectedValues.includes(optionId)
      ? selectedValues.filter((v) => v !== optionId)
      : [...selectedValues, optionId];
    onChange(newValues);
  };

  const getSelectedLabels = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.id === selectedValues[0]);
      return option ? option.label : placeholder;
    }
    return `${selectedValues.length} options selected`;
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={handleToggle}>
        <span className={styles.dropdownText}>{getSelectedLabels()}</span>
        <span className={`${styles.dropdownArrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}>
          ▼
        </span>
      </div>
      
      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedValues.includes(option.id) ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                readOnly
                className={styles.checkbox}
              />
              <span className={styles.optionLabel}>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
