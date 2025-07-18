import React, { useState } from "react";
import styles from "./AccountDeletion.module.css";
import { RadioOption } from "./RadioOption";
import { feedbackOptions } from "./feedbackOptions";
import { useUser } from "@clerk/clerk-react";
import { DeleteAccountModal } from "./deletePopup/DeleteAccountModal";
import { DeleteAccountModal as DeleteAccountModalSuccess } from "./accountDeletedPopup/DeleteAccountModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AccountDeletion() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSelectedReason = () => {
    const selectedOptionData = feedbackOptions.find(option => option.id === selectedOption);
    return selectedOptionData ? selectedOptionData.text : "Other";
  };

  const getSelectedCategory = () => {
    const selectedOptionData = feedbackOptions.find(option => option.id === selectedOption);
    return selectedOptionData ? selectedOptionData.category : "OTHER";
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      
      // Get the selected reason and category
      const reason = getSelectedReason();
      const category = getSelectedCategory();
      
      // The deletion request will be handled in the DeleteAccountModal component
      // where we'll pass the reason, category, and additional feedback
      setIsModalOpen(false);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error during account deletion process:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className={styles.title}>Delete Your Account</h1>
          <p className={styles.subtitle}>
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </header>

        <div className={styles.feedbackSection}>
          <h2 className={styles.feedbackTitle}>
            Help us improve by telling us why you're leaving
          </h2>
          
          <form className={styles.feedbackForm}>
            <fieldset className={styles.optionsGroup}>
              <legend className={styles.legend}>What's the main reason?</legend>
              {feedbackOptions.map((option) => (
                <RadioOption
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  isSelected={selectedOption === option.id}
                  onChange={setSelectedOption}
                />
              ))}
            </fieldset>

            <div className={styles.textareaSection}>
              <label
                htmlFor="additionalFeedback"
                className={styles.textareaLabel}
              >
                Additional feedback (optional)
              </label>
              <textarea
                id="additionalFeedback"
                className={styles.textarea}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us more about your experience..."
                aria-label="Additional feedback"
                rows={4}
              />
              <p className={styles.textareaHelp}>
                Your feedback helps us improve our service for other users.
              </p>
            </div>
          </form>
        </div>

        <div className={styles.divider} />
        
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/settings/general')}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => setIsModalOpen(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Processing...
              </>
            ) : (
              'Delete My Account'
            )}
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && isSignedIn && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DeleteAccountModal
              onClose={() => setIsModalOpen(false)}
              onDelete={handleDelete}
              reason={getSelectedReason()}
              category={getSelectedCategory()}
              additionalFeedback={feedback}
            />
          </div>
        </div>
      )}

      {isDeleted && !isSignedIn && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DeleteAccountModalSuccess
              onClose={() => setIsDeleted(false)}
              onDelete={() => setIsDeleted(true)}
              onGoHome={() => navigate("/home")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
