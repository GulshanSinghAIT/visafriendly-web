import React from "react";
import styles from "./BlogCard.module.css";

export default function BlogCard({ image, category, date, title, link }) {
  return (
    <article className={styles.blogCard}>
      <a href={link} className={styles.cardLink}>
        <img src={image} alt="" className={styles.cardImage} />
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <span className={styles.category}>{category}</span>
            <time className={styles.date}>{date}</time>
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      </a>
    </article>
  );
}
