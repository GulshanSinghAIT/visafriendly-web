import React from "react";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";

export const BlogHeader = ({ title, date, category }) => {
  return (
    <header className={styles.blogHeader}>
      <Link to={"/blogs"}>
        <div className={styles.backButton}>
          <img
            src={`https://cdn.builder.io/api/v1/image/assets/TEMP/f18ca7ea723e646afeb5b2ea06f7242ce7631dc7a0e94c0c47102fdf5abbbf98?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
            alt=""
            className={styles.backIcon}
          />

          <span className={styles.backText}>Back</span>
        </div>
      </Link>
      <h1 className={styles.blogTitle}>{title}</h1>
      <div className={styles.blogMeta}>
        <time dateTime={date}>{date}</time>
        <span>{category}</span>
      </div>
      <img
        src={`https://cdn.builder.io/api/v1/image/assets/TEMP/b5901f04294cc53fe80a06390b557f36212408e7af90df845d9f514a25aaad71?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
        alt="Blog header illustration"
        className={styles.headerImage}
      />
    </header>
  );
};
