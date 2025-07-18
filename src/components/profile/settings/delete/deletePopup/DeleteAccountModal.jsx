import React, { useState } from "react";
import styles from "./DeleteAccountModal.module.css";
import { Button } from "./Button";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react";

export const DeleteAccountModal = ({ onClose, onDelete, reason, category, additionalFeedback }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const orgEmail = user?.emailAddresses[0]?.emailAddress;

  const handleDelete = async () => {
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      // First delete from database
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/settings/deleteAccount`,
        {
          data: { 
            email: orgEmail,
            reason: reason,
            category: category,
            additionalFeedback: additionalFeedback
          },
        }
      );

      if (response.data.success) {
        // If DB deletion successful, delete Clerk user
        try {
          await user.delete();
          await signOut();
          onDelete();
        } catch (clerkError) {
          console.error("Error deleting Clerk user:", clerkError);
          // Try to restore DB user if Clerk deletion fails
          // You might want to implement this restoration logic in your backend
        }
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={styles.deleteModal}
      role="dialog"
      aria-labelledby="deleteAccountTitle"
    >
      <div className={styles.content}>
        <h2 id="deleteAccountTitle" className={styles.title}>
          Delete Account
        </h2>
        <p className={styles.message}>
          Deleting your account will remove all of your information from our
          database. This cannot be undone.
        </p>
        <div className={styles.confirmationBox}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className={styles.checkmark}
              aria-label="Confirm account deletion understanding"
            />
          </label>
          <span className={styles.confirmationText}>
            I understand that won't be able to recover my account
          </span>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={!isConfirmed || isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </Button>
      </div>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
        disabled={isDeleting}
      >
        <div className={styles.closeIcon}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/99b7e3196318b366bc1c98ce7fd7779ebccf00fdbb79e1a9322aef16065048a9?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}"
            alt=""
            className={styles.closeIconImage}
          />
        </div>
      </button>
    </div>
  );
};
