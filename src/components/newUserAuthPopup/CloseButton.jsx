import React from "react";
import styles from "./CloseButton.module.css";

export const CloseButton = ({ onClose }) => {
  return (
    <button
      className={styles.closeButton}
      onClick={onClose}
      aria-label="Close modal"
      tabIndex={0}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/99b7e3196318b366bc1c98ce7fd7779ebccf00fdbb79e1a9322aef16065048a9?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
        alt=""
        className={styles.closeIcon}
        loading="lazy"
      />
    </button>
  );
};
