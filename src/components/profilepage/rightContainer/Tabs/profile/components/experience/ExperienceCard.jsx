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
  onEdit,
}) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [isVisible, setIsVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Add confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this work experience?");
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/deleteWorkCard/${id}`, {
        data: { email },
      });
      setIsVisible(false);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Error deleting work experience:", error);
      alert("Failed to delete work experience. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit({
        id,
        companyName,
        companyDomain,
        jobTitle,
        description,
        startDate: null, // Will be parsed from duration in the form
        endDate: null,   // Will be parsed from duration in the form
        companyLogo
      });
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
              <div className={styles.jobTitle}>
                {jobTitle} <span className="flex justify-end text-[12px] sm:text-[14px] font-normal text-gray-500">{duration}</span>
              </div>
              <div className={styles.companyName}>
                {companyName}
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
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
                disabled={isDeleting}
                style={{ 
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  opacity: isDeleting ? 0.5 : 1
                }}
              />
            </div>
          </div>

          <ul>
            {(description || "").split("\n").map((line, index) => (
              <ul key={index} className={styles.description}>
                {line}
              </ul>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
