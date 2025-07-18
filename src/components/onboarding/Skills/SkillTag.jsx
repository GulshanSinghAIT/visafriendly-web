import React from "react";
import styles from "./SkillTag.module.css";

export const SkillTag = ({ skill, onRemove }) => {
  return (
    <div className={styles.skillTag} role="button" tabIndex={0}>
      <span className={styles.skillText}>{skill}</span>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(skill)}
        aria-label={`Remove ${skill} skill`}
      >
        <img
          src={`https://cdn.builder.io/api/v1/image/assets/TEMP/d0663c8431e2836cbd3fdd74cfb5754a790061719418417ee548f8c913edc076?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}`}
          alt=""
          className={styles.closeIcon}
        />
      </button>
    </div>
  );
};
