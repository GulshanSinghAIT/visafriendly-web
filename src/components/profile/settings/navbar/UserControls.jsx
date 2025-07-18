import React, { useState } from "react";
import styles from "./UserControls.module.css";

export function UserControls() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.controls} role="group" aria-label="User controls">
      <button className={styles.iconButton} aria-label="Notifications">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e1adbf44190ed14a4a1f891b31c82ab62c9e9a2ca7ccd7dbaf727e53d750811?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          alt=""
          className={styles.icon}
          loading="lazy"
        />
      </button>
      <button className={styles.iconButton} aria-label="Messages">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4416a96d06d5124f25daa62e4901c8122815b9e98b1431a8996fe5f088ed3d23?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          alt=""
          className={styles.icon}
          loading="lazy"
        />
      </button>
      <button
        className={styles.avatarButton}
        aria-label="User profile"
        onClick={toggleDropdown}
      >
        <div className={styles.avatar}>A</div>
      </button>
      {isDropdownVisible && (
        <div className={styles.dropdown}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarLarge}>
              <img src="/images/logo.png" alt="Profile" />
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.name}>David John</p>
              <p className={styles.email}>david@gmail.com</p>
            </div>
            <div className={styles.progressCircle}>
              <div className={styles.progressBar}>
                <span>75%</span>
              </div>
            </div>
          </div>
          <ul className={styles.menu}>
            <li>Resume</li>
            <li>Manage Job Alerts</li>
            <li>
              Pricing <sup className={styles.starterPlan}>Starter Plan</sup>
            </li>
            <li>Settings</li>
            <li>Feature Request</li>
            <li>Referral</li>
            <li>Helps</li>
          </ul>
          <div className={styles.logout}>
            <button>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}
