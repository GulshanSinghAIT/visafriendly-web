import React from "react";
import styles from "./CloseButton.module.css";

export const CloseButton = ({ onClick, iconSrc, iconAlt }) => {
  return (
    <div className={styles.buttonIcons}>
      <button
        className={styles.buttonIconSmall}
        onClick={onClick}
        aria-label="Close"
        tabIndex="0"
      >
        <img
          loading="lazy"
          src={iconSrc}
          alt={iconAlt}
          className={styles.icon}
        />
      </button>
    </div>
  );
};
