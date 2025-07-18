import React from "react";
import { BlogCard } from "./blogard";
import { blogData } from "./BlogData";
import styles from "./blolist.module.css";

export function Blolist() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Visafriendly Blogs</h1>
      <div className={styles.blogList}>
        {blogData.slice(0, 1).map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            category={blog.category}
            date={blog.date}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </main>
  );
}
