import React, { useState } from "react";
import axios from "axios";
import styles from "./JobAlertCard.module.css";
import { useUser } from "@clerk/clerk-react";

const JobAlertCard = ({ alert, onDelete, onUpdate }) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState({
    title: alert.title,
    location: alert.location,
    frequency: alert.frequency,
  });
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      title: alert.title,
      location: alert.location,
      frequency: alert.frequency,
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!editedData.title) {
      setError("Keywords are required");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      // Convert title back to keywords array if needed
      const keywords = editedData.title
        .split(",")
        .map((keyword) => keyword.trim());

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/updateAlert/${alert.id}`,
        {
          email,
          keywords,
          location: editedData.location,
          frequency: editedData.frequency,
        }
      );

      if (response.data.success) {
        setIsEditing(false);

        // Update parent component
        if (onUpdate) {
          onUpdate({
            ...alert,
            title: editedData.title,
            location: editedData.location,
            frequency: editedData.frequency,
          });
        }
      } else {
        setError("Failed to update alert");
      }
    } catch (error) {
      console.error("Error updating job alert:", error);
      setError("Error updating alert. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.alertCard}>
      <div className={styles.alertContent}>
        <div className={styles.companyInfo}>
          <img
            src={alert.companyLogo}
            alt="Company logo"
            className={styles.companyLogo}
          />
          <div className={styles.jobInfo}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedData.title}
                  onChange={handleChange}
                  className={styles.editInput}
                  placeholder="Keywords (separate with commas)"
                />
                <input
                  type="text"
                  name="location"
                  value={editedData.location}
                  onChange={handleChange}
                  className={styles.editInput}
                  placeholder="Location"
                />
                <select
                  name="frequency"
                  value={editedData.frequency}
                  onChange={handleChange}
                  className={styles.editSelect}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                {error && <p className={styles.errorMessage}>{error}</p>}
              </>
            ) : (
              <>
                <h2 className={styles.jobTitle}>{editedData.title}</h2>
                <p className={styles.location}>{editedData.location}</p>
                <p className={styles.frequency}>{editedData.frequency}</p>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className={styles.editActions}>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={styles.saveButton}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <button
              className={styles.editButton}
              onClick={handleEdit}
              aria-label={`Edit alert for ${alert.title}`}
            >
              <img
                src="/images/pencil.png"
                alt="Edit"
                className={styles.editIcon}
              />
            </button>
            <button
              className={styles.deleteButton}
              onClick={onDelete}
              aria-label={`Delete alert for ${alert.title}`}
            >
              <img
                src="/images/trash.png"
                alt="Delete"
                className={styles.deleteIcon}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobAlertCard;
