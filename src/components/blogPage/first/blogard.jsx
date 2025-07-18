import React from "react";
import styles from "./blogard.module.css";
import { Link } from "react-router-dom";

export function BlogCard({ image, category, date, title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} loading="lazy" className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{category}</span>
          <time dateTime={date}>{date}</time>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link
          className={styles.readMore}
          to="/blogsRead"
          aria-label={`Read more about ${title}`}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
