import React, { useState } from "react";
import styles from "./SkillInput.module.css";

export const SkillInput = ({ onAddSkill }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddSkill(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      {/* <label htmlFor="skillInput" className="visually-hidden">
        Enter a skill
      </label> */}
      <input
        id="skillInput"
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="eg., Copy Writing"
        aria-label="Enter a skill"
      />
      <div className={styles.iconWrapper}>
        <img
          src={`https://cdn.builder.io/api/v1/image/assets/TEMP/38297dbd2592baf0982d1fd4d89419a38f49077c02c4f62c25980a7f61f6e5be?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}`}
          alt=""
          className={styles.icon}
        />
      </div>
    </form>
  );
};
