import React from "react";
import styles from "./FormSection.module.css";

export function FormSection({ title, description, children, required }) {
  return (
    <section className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {title}
          {required && <span className={styles.required}>*</span>}
        </h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
