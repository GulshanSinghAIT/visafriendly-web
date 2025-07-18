import React from "react";
import styles from "./DeleteAccountModal.module.css";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

export const DeleteAccountModal = ({ onClose, onGoHome }) => {
  return (
    <div
      className={styles.deleteModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteAccountTitle"
    >
      <div className={styles.content}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf248f1fbed93cc83b80c55f669e7cc0c5f691042326ff1e5050cd634bae854c?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
          alt="Account deletion confirmation icon"
          className={styles.confirmationIcon}
        />
        <h1 id="deleteAccountTitle" className={styles.title}>
          Your account is deleted
        </h1>
      </div>

      <div className={styles.buttonGroup}>
        <Button onClick={onGoHome}>Go to Home</Button>
      </div>

      <CloseButton
        onClick={onClose}
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/99b7e3196318b366bc1c98ce7fd7779ebccf00fdbb79e1a9322aef16065048a9?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
        iconAlt="Close modal"
      />
    </div>
  );
};
