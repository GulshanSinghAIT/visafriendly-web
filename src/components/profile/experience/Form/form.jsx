import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";
import { useUser } from "@clerk/clerk-react";

const AddExperienceForm = ({ onClose, onSave }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentWork, setCurrentWork] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Track errors
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const handleSaveChanges = async () => {
    if (!email) {
      setError("User email is missing. Please log in again.");
      return;
    }

    try {
      const experienceData = {
        companyName,
        companyDomain,
        jobTitle,
        startDate,
        endDate: currentWork ? null : endDate,
        currentWork,
        description,
        email,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/workExperience`,
        experienceData
      );

      onSave(response.data.experience);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding experience:", error);
      setError("Failed to add experience. Please try again.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Experience</h2>
          <div className={styles.closeButton}>
            <img
              src="/images/x.png"
              alt="Close"
              className={styles.headerIcon}
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="companyName" className={styles.label}>
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.input}
                placeholder="Enter Company Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="companyDomain" className={styles.label}>
                Company Domain
              </label>
              <input
                type="text"
                id="companyDomain"
                value={companyDomain}
                onChange={(e) => setCompanyDomain(e.target.value)}
                className={styles.input}
                placeholder="e.g., company.com"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="jobTitle" className={styles.label}>
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter Job Title"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="endDate" className={styles.label}>
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.input}
                disabled={currentWork} // Disable when 'Currently Working' is checked
              />
            </div>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="currentWork"
              checked={currentWork}
              onChange={(e) => {
                setCurrentWork(e.target.checked);
                if (e.target.checked) setEndDate(""); // Clear endDate when checked
              }}
              className={styles.checkbox}
            />
            <label htmlFor="currentWork" className={styles.checkboxLabel}>
              I currently work here
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Type description here"
            ></textarea>
          </div>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceForm;
