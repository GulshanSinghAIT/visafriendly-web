import React from "react";
import styles from "./Tags.module.css";

export const RoleTag = ({ label, variant, onRemove }) => {
  return (
    <div className={`${styles.roleTag} ${styles[variant]}`}>
      <span className={styles.roleLabel}>{label}</span>
      <button
        type="button"
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </div>
  );
};
