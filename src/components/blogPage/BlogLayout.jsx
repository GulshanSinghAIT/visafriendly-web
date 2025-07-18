import React, { useState } from "react";
import Sidebar from "../blogPage/second/Sidebar";
import BlogList from "../blogPage/second/BlogList";
import styles from "./BlogLayout.module.css";
import { Blolist } from "../blogPage/first/blolist";
import { blogData } from "./blogData";
import { NavBarrr } from "../Navbar/NavBar";

export default function BlogLayout() {
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1); // Deselect category if already selected
    } else {
      updatedCategories.push(category); // Select category
    }

    setSelectedCategories(updatedCategories);

    const filtered = blogData.filter((blog) =>
      updatedCategories.length > 0
        ? updatedCategories.includes(blog.category)
        : true
    );

    setFilteredBlogs(filtered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = blogData.filter((blog) =>
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className={styles.blogContainer}>
      <NavBarrr />
      <Blolist />
      <main className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <Sidebar
            onCategorySelect={handleCategorySelect}
            onSearch={handleSearch}
            selectedCategories={selectedCategories}
            toggleCategory={handleCategorySelect}
          />
          <BlogList blogs={filteredBlogs} />
        </div>
      </main>
    </div>
  );
}
