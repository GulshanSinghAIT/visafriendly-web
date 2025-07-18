import React from "react";
import styles from "./Blog.module.css";

export const BlogSection = ({ title, content, items }) => {
  return (
    <section className={styles.blogSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {content && <p className={styles.sectionContent}>{content}</p>}
      {items && (
        <div className={styles.itemsList}>
          {items.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <strong>{item.title}:</strong> {item.content}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
