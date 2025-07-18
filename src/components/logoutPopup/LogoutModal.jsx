import { React, useState } from "react";
import styles from "./LogoutModal.module.css";
import { Button } from "./Button";
import { LogoutModal as LogoutSuccess } from "../logoutSucessPopup/LogoutModal";

export function LogoutModal({ onClose, onLogout }) {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className={styles.logOut} role="dialog" aria-labelledby="logout-title">
      <div className={styles.content}>
        <h2 id="logout-title" className={styles.title}>
          Log Out
        </h2>
        <p className={styles.message}>
          Are you sure you want to log out? You will need to sign in again to
          access your account.
        </p>
      </div>

      <div className={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onLogout}>
          Log Out
        </Button>
      </div>

      <div className={styles.buttonIcons}>
        <div className={styles.buttonIconSmall}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/99b7e3196318b366bc1c98ce7fd7779ebccf00fdbb79e1a9322aef16065048a9?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
            alt=""
            className={styles.img}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
