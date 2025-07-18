import React, { use } from "react";
import styles from "./OpportunityModal.module.css";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";
import { useNavigate } from "react-router-dom";

export const OpportunityModal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.modal} role="dialog" aria-labelledby="modalTitle">
      <CloseButton onClose={onClose} />

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3013e7b4a3f1fd325d66c9c784aac78fe1f8cd95d32d6445c34d7625255c820?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
        alt="Opportunity illustration"
        className={styles.illustration}
        loading="lazy"
      />

      <div className={styles.content}>
        <h2 id="modalTitle" className={styles.title}>
          Looking for Your Next Opportunity?
        </h2>
        <p className={styles.message}>
          Sign up to find visa-sponsored jobs. Already a member? Log in to
          manage your applications.
        </p>
      </div>

      <div className={styles.buttonGroup}>
        <Button
          variant="default"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
