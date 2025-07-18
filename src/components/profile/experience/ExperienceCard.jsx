import React, { useState } from "react";
import styles from "./WorkExperience.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export const ExperienceCard = ({
  id,
  companyLogo,
  jobTitle,
  companyName,
  companyDomain,
  duration,
  description,
  onDelete,
  onUpdate,
}) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [editedData, setEditedData] = useState({
    jobTitle,
    companyName,
    companyDomain,
    startDate: "",
    endDate: "",
    description,
  });
  const [error, setError] = useState("");

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const convertToBackendFormat = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Convert text date to DD/MM/YYYY
  const formatTextDateToDDMMYYYY = (textDate) => {
    if (textDate === "Present") return "";

    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [month, year] = textDate.split(" ");
    return `01/${months[month]}/${year}`;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/deleteWorkCard/${id}`, {
        data: { email },
      });
      setIsVisible(false);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Error deleting work experience:", error);
    }
  };

  const handleEdit = () => {
    // Safely parse duration
    if (duration) {
      const dateMatch = duration.match(/(\w+ \d{4}) - (\w+)/);
      if (dateMatch) {
        setEditedData((prev) => ({
          ...prev,
          startDate: formatTextDateToDDMMYYYY(dateMatch[1]),
          endDate:
            dateMatch[2] === "Present"
              ? ""
              : formatTextDateToDDMMYYYY(dateMatch[2]),
        }));
        setIsCurrentJob(duration.includes("Present"));
      }
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      jobTitle,
      companyName,
      companyDomain,
      startDate: "",
      endDate: "",
      description,
    });
    setIsCurrentJob(false);
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
    if (
      !editedData.jobTitle ||
      !editedData.companyName ||
      !editedData.startDate ||
      !editedData.companyDomain
    ) {
      setError("Job title, company name, company domain and start date are required");
      return;
    }

    // Validate date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (editedData.startDate && !dateRegex.test(editedData.startDate)) {
      setError("Start date must be in DD/MM/YYYY format");
      return;
    }

    if (
      !isCurrentJob &&
      editedData.endDate &&
      !dateRegex.test(editedData.endDate)
    ) {
      setError("End date must be in DD/MM/YYYY format");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      // Construct duration string
      const startDateFormatted = editedData.startDate;
      const endDateFormatted = isCurrentJob ? "Present" : editedData.endDate;

      const updatedDuration = `${startDateFormatted} - ${endDateFormatted}`;

      const response = await axios.put(
                  `${process.env.REACT_APP_API_URL}/profile/updateWorkCard/${id}`,
        {
          email,
          jobTitle: editedData.jobTitle,
          companyName: editedData.companyName,
          startDate: convertToBackendFormat(editedData.startDate),
          endDate: isCurrentJob
            ? null
            : convertToBackendFormat(editedData.endDate),
          description: editedData.description,
          isCurrentJob: isCurrentJob,
        }
      );

      if (response.data.success) {
        setIsEditing(false);
        // Update parent component if callback exists
        if (onUpdate) {
          onUpdate({
            id,
            jobTitle: editedData.jobTitle,
            companyName: editedData.companyName,
            duration: updatedDuration,
            description: editedData.description,
            companyLogo,
          });
        }
      } else {
        setError("Failed to update experience");
      }
    } catch (error) {
      console.error("Error updating work experience:", error);
      setError("Error updating work experience. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.experienceCard}>
      <div className={styles.cardContent}>
        <img
          src={`https://logo.clearbit.com/${companyDomain}`}
          alt={`${companyName} logo`}
          className={styles.companyLogo}
        />
        <div className={styles.experienceDetails}>
          <div className={styles.experienceHeader}>
            <div className={styles.headerInfo}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="jobTitle"
                    value={editedData.jobTitle}
                    onChange={handleChange}
                    className={styles.editInput}
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={editedData.companyName}
                    onChange={handleChange}
                    className={styles.editInput}
                    placeholder="Company Name"
                  />
                  <div className={styles.dateInputContainer}>
                    <div className={styles.dateInput}>
                      <label>Start Date (DD/MM/YYYY)</label>
                      <input
                        type="text"
                        name="startDate"
                        value={editedData.startDate}
                        onChange={handleChange}
                        className={styles.editInput}
                        placeholder="DD/MM/YYYY"
                        maxLength={10}
                      />
                    </div>
                    {!isCurrentJob && (
                      <div className={styles.dateInput}>
                        <label>End Date (DD/MM/YYYY)</label>
                        <input
                          type="text"
                          name="endDate"
                          value={editedData.endDate}
                          onChange={handleChange}
                          className={styles.editInput}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                        />
                      </div>
                    )}
                    <label className={styles.currentJobLabel}>
                      <input
                        type="checkbox"
                        checked={isCurrentJob}
                        onChange={(e) => {
                          setIsCurrentJob(e.target.checked);
                          if (e.target.checked) {
                            setEditedData((prev) => ({
                              ...prev,
                              endDate: "",
                            }));
                          }
                        }}
                      />
                      Currently work here
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.jobTitle}>{editedData.jobTitle}</div>
                  <div className={styles.companyName}>
                    {editedData.companyName}
                  </div>
                  <div className={styles.duration}>{duration}</div>
                </>
              )}
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
              <>
                <img
                  src={`/images/pencil.png`}
                  alt="Edit Icon"
                  className={styles.editIcon}
                  aria-label={`Edit ${jobTitle} at ${companyName}`}
                  onClick={handleEdit}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={`/images/trash.png`}
                  alt="Delete Icon"
                  className={styles.deleteIcon}
                  aria-label={`Delete ${jobTitle} at ${companyName}`}
                  onClick={handleDelete}
                  style={{ cursor: "pointer" }}
                />
              </>
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                name="description"
                value={editedData.description}
                onChange={handleChange}
                className={styles.editTextarea}
                placeholder="Description (separate points with new lines)"
                rows="4"
              />
              {error && <div className={styles.errorMessage}>{error}</div>}
            </>
          ) : (
            <ol>
              {(editedData.description || "").split("\n").map((line, index) => (
                <li key={index} className={styles.description}>
                  {line}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};
