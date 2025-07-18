import React from "react";
import styles from "./TestimonialCard.module.css";

export const TestimonialCard = ({ content, author, role, logo, pic }) => {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <p className={styles.description}>{content}</p>
        <div className={styles.divider} />
        <div className={styles.authorInfo}>
          <img src={pic} alt="Author Logo" className={styles.authorLogo} />
          <div className={styles.authorDetails}>
            <span className={styles.authorName}>{author}</span>
            {role && <span className={styles.role}>{role}</span>}
          </div>
        </div>
      </div>
    </article>
  );
};
