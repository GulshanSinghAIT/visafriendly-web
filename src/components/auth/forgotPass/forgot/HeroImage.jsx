import React from "react";
import styles from "./HeroImage.module.css";

export default function HeroImage() {
  return (
    <div className={styles.heroWrapper}>
      <img
        loading="lazy"
        src="/images/signup.png"
        className={styles.heroImage}
        alt="Signup hero illustration"
        role="img"
      />
    </div>
  );
}
