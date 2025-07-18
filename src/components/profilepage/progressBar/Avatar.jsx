import React from "react";
import styles from "./Avatar.module.css";

export const Avatar = ({ imageUrl, size = 46 }) => {
  return (
    <div className={styles.avatarWrapper} style={{ width: size, height: size }}>
      <div
        className={styles.avatarContainer}
        style={{ width: size, height: size }}
      >
        <img
          loading="lazy"
          src={imageUrl}
          className={styles.avatarImage}
          alt="Profile avatar"
        />
      </div>
    </div>
  );
};
