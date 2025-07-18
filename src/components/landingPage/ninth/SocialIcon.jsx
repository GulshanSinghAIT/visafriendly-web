import React from "react";
import styles from "./Footer.module.css";

export const SocialIcon = ({ src, alt, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img loading="lazy" src={src} alt={alt} className={styles.socialIcon} />
  </a>
);
