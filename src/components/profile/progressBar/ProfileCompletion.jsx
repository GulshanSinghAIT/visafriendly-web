import React from "react";
import { Avatar } from "./Avatar";
import styles from "./ProfileCompletion.module.css";

export const ProfileCompletion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileSection}>
          <Avatar imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/28a370643cf4e24ccc5c51b315863183f18668bc4c7917c2cdb977422d84c39b?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}" />
          <div className={styles.textContent}>
            <h1 className={styles.title}>Complete your Profile</h1>
            <p className={styles.description}>
              Fill your resume, portfolio, or professional bio to finish your
              profile
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a67724d8db8931b27ac943decd80a3428c05f0ae5ce4648eba6c87011336fa2e?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          className={styles.progressImage}
          alt="Profile completion progress"
        />
      </div>
    </div>
  );
};
