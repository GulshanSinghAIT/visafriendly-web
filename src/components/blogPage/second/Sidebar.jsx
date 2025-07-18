import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const categories = [
  "Product Updates",
  "News",
  "Insights",
  "Skill",
  "Information",
  "Collaboration",
  "Updates",
];

const topArticles = [
  {
    image: "/images/article.png",
    title: "Shaping the Future of Digital Security",
    date: "Nov 01, 2024",
    link: "/blog/digital-security-future",
  },
  {
    image: "/images/article.png",
    title: "Shaping the Future of Digital Security",
    date: "Nov 01, 2024",
    link: "/blog/digital-security-innovation",
  },
];

const socialLinks = [
  { icon: "/images/X.svg", platform: "twitter" },
  { icon: "/images/Linkedin.svg", platform: "linkedin" },
  { icon: "/images/Instagram.svg", platform: "instagram" },
  { icon: "/images/Whats.svg", platform: "whatsapp" },
];

export default function Sidebar({
  onCategorySelect,
  onSearch,
  selectedCategories,
  toggleCategory,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryClick = (category) => {
    toggleCategory(category);
  };

  const generateShareLink = (platform) => {
    const currentPageURL = window.location.href;
    const encodedURL = encodeURIComponent(currentPageURL);
    const encodedMessage = encodeURIComponent(
      `Check out this page: ${currentPageURL}`
    );

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodedURL}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}`;
      case "instagram":
        return `https://www.instagram.com/?url=${encodedURL}`; // Instagram sharing is more suited for app integrations.
      case "whatsapp":
        return `https://wa.me/?text=${encodedMessage}`;
      default:
        return "#";
    }
  };

  return (
    <aside className={styles.sidebar}>
      <form className={styles.searchContainer} role="search">
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search"
          aria-label="Search blogs"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryTags}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryTag} ${
                selectedCategories.includes(category) ? styles.selected : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.topArticlesSection}>
        <h2 className={styles.sectionTitle}>Top Articles</h2>
        {topArticles.map((article, index) => (
          <a key={index} href={article.link} className={styles.topArticle}>
            <img
              src={article.image}
              alt=""
              className={styles.topArticleImage}
            />
            <div className={styles.topArticleContent}>
              <h3 className={styles.topArticleTitle}>{article.title}</h3>
              <time className={styles.topArticleDate}>{article.date}</time>
            </div>
          </a>
        ))}
      </section>

      <section className={styles.shareSection}>
        <h2 className={styles.sectionTitle}>Share The Page</h2>
        <div className={styles.socialIcons}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={generateShareLink(social.platform)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={social.icon} alt="" className={styles.socialIcon} />
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
