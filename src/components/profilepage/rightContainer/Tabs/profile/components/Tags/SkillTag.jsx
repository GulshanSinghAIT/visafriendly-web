import React from "react";
import styles from "./Tags.module.css";
import { alignProperty } from "@mui/material/styles/cssUtils";

// SkillTag.jsx
export const SkillTag = ({ skill, years, onRemove }) => {
  const formattedYears =
    typeof years === "number"
      ? `${years} Year${years !== 1 ? "s" : ""}`
      : years;

  return (
    <div className={styles.skillTag}>
      <span className={styles.skillLabel}>
        {skill} - {formattedYears}
      </span>
      <div className={styles.del}>
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label={`Remove ${skill}`}
        >
          <img src="/images/trash.png" alt="Remove" />
        </button>
      </div>
    </div>
  );
};
