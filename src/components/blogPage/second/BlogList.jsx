import React from "react";
import BlogCard from "./BlogCard";
import styles from "./BlogList.module.css";

export default function BlogList({ blogs }) {
  return (
    <section className={styles.blogList} aria-label="Latest blog posts">
      <h2 className={styles.listTitle}>Latest Blogs</h2>
      <div className={styles.blogGrid}>
        {blogs.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
}
