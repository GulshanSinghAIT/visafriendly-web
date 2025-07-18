import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ icon, placeholder, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <Link to="">
        <div className={styles.searchContent}>
          <img loading="lazy" src={icon} className={styles.searchIcon} alt="" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={styles.searchText}
            placeholder={placeholder}
          />
          {/* {placeholder === "Job Category" && (
          <button className={styles.arrow}>
            <img src="/images/arrow_down.png" alt="Job Category" />
          </button>
        )} */}
        </div>
      </Link>
    </div>
  );
};
