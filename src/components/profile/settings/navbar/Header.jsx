import React from "react";
import { NavigationLinks } from "./NavigationLinks";
import { UserControls } from "./UserControls";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a978679c624b167873199c3ea183c1819b431beea6e774ffb66602439b2ac38?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          alt="VisaFriendly logo"
          className={styles.logo}
          loading="lazy"
        />
        <span className={styles.brandName}>VisaFriendly</span>
      </div>
      <NavigationLinks />
      <UserControls />
    </header>
  );
}
