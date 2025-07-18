import React from "react";
import styles from "./LogoutModal.module.css";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

export const LogoutModal = ({ onClose, onGoHome }) => {
  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div className={styles.content}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb51e704dce51461e73ea8e19a19fb728dbf2a5866b9ed3c715e40f72638a2d3?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          alt="Logout success icon"
          className={styles.successIcon}
          loading="lazy"
          onClick={onClose}
        />
        <h1 id="logout-title" className={styles.title}>
          Logged Out Successfully
        </h1>
        <p className={styles.message}>
          You have been logged out. See you again soon!
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <Button onClick={onGoHome}>Go to Home</Button>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
};
