import React from "react";
import { BlogHeader } from "./BlogHeader";
import { BlogSection } from "./BlogSection";
import { blogData } from "./BlogData";
import styles from "./Blog.module.css";
import { Footer } from "../landingPage/ninth/Footer";
import { NavBarrr } from "../Navbar/NavBar";
export const Blog = () => {
  return (
    <main className={styles.blogContainer}>
      <NavBarrr />

      <article className={styles.blogContent}>
        <BlogHeader
          title={blogData.title}
          date={blogData.date}
          category={blogData.category}
        />

        {blogData.sections.map((section, index) => (
          <BlogSection
            key={index}
            title={section.title}
            content={section.content}
            items={section.challenges}
          />
        ))}

        <BlogSection
          title="How VisaFriendly Simplifies Your H1B Process"
          content="VisaFriendly is designed to take the stress out of your H1B journey. Here's how our platform makes a difference:"
          items={blogData.visaFriendlyBenefits}
        />

        <BlogSection
          title="Limitations and Challenges of the H1B Visa"
          content="While the H1B visa offers numerous advantages, it's not without its challenges. Here's what to keep in mind:"
          items={blogData.limitations}
        />

        <BlogSection
          title={blogData.conclusion.title}
          content={blogData.conclusion.content}
        />
      </article>
      <div className={styles.blog}>
        <span className={styles.nextBlog}> Move to the next blog</span>
        <img src="/images/blogArr.png" alt="blog" className={styles.arr} />
      </div>
      <Footer />
    </main>
  );
};
