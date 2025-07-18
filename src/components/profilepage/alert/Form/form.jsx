import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";
import { useUser } from "@clerk/clerk-react";

const AddExperienceForm = ({ onClose, onSave }) => {
  const [keywords, setKeywords] = useState([
    "Business Analytics - 2 Years",
    "Business Analytics - 2 Years",
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
      setJobTitle(extractJobTitle(newKeyword)); // Set job title based on keyword
    }
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddKeyword();
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/profile/jobAlert`,
        {
          jobTitle,
          keywords,
          location,
          frequency,
          similarJobs: document.getElementById("similarJobs").checked,
          email: email,
        }
      );

      if (response.status === 201) {
        const newAlert = {
          id: response.data.id, // Use returned ID from backend
          title: jobTitle,
          location: location,
          frequency: `Frequency: ${
            frequency.charAt(0).toUpperCase() + frequency.slice(1)
          } via email and Notification`,
          companyLogo: "/images/suitcase.png",
        };

        onSave(newAlert); // Pass the new alert to the parent
        onClose(); // Close the form
        window.location.reload(); // Reload the page to show the new alert
      }
    } catch (error) {
      console.error("Error saving job alert:", error);
    }
  };

  const extractJobTitle = (keyword) => {
    const parts = keyword.split(" - ");
    return parts.length > 0 ? parts[0] : keyword; // Remove the years part (if any)
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create new Job Alert</h2>
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
          <div className={styles.frequency}>
            <label>
              <input
                type="radio"
                name="frequency"
                value="daily"
                checked={frequency === "daily"}
                onChange={() => setFrequency("daily")}
                className={styles.radio}
              />
              <span className={styles.radioLabel}>Daily</span>
            </label>
            <label>
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={frequency === "weekly"}
                onChange={() => setFrequency("weekly")}
                className={styles.radio}
              />
              <span className={styles.radioLabel}>Weekly</span>
            </label>
            <label>
              <input
                type="radio"
                name="frequency"
                value="monthly"
                checked={frequency === "monthly"}
                onChange={() => setFrequency("monthly")}
                className={styles.radio}
              />
              <span className={styles.radioLabel}>Monthly</span>
            </label>
          </div>

          {/* Add Keywords Section */}
          <div className={styles.inputGroup}>
            <label htmlFor="addKeywords" className={styles.label}>
              Add Keywords
            </label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                id="addKeywords"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className={styles.input}
                placeholder="Enter Keywords"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className={styles.keywordList}>
              {keywords.map((keyword, index) => (
                <div className={styles.keywordItem} key={index}>
                  <span>{keyword}</span>
                  <img
                    src="/images/trash.png"
                    alt="Delete"
                    className={styles.deleteIcon}
                    onClick={() => handleRemoveKeyword(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox */}
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="similarJobs"
              className={styles.checkbox}
            />
            <label htmlFor="similarJobs" className={styles.checkboxLabel}>
              Get alerts for similar jobs like this
            </label>
          </div>
        </div>
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
