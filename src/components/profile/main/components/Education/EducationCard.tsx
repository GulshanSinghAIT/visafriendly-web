import React, { useState, useEffect, useRef } from "react";
import styles from "./EducationCard.module.css";
import { EducationItem } from "./types";

interface EducationCardProps {
  education: EducationItem;
  onDelete: () => void;
  onUpdate: (updatedData: any) => void;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education, onDelete, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    universityName: education.instituteName,
    degreeLevel: education.degreeLevel || "",
    courseName: education.courseName || "",
    major: education.major === "N/A" ? "" : education.major,
    startDate: education.startDate ? new Date(education.startDate).toISOString().split('T')[0] : "",
    endDate: education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : ""
  });

  // Handle outside click to save the form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        saveChanges();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, formData]);

  const handleRemove = () => {
    onDelete();
    setIsVisible(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveChanges = () => {
    if (isEditing) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.card} ${isEditing ? styles.editing : ''}`} ref={cardRef}>
      <div className={styles.cardContent}>
        <div className={styles.logoWrapper}>
          <img
            loading="lazy"
            src={education.logoSrc}
            alt={`${education.instituteName} logo`}
            className={styles.logo}
          />
        </div>
        
        <div className={styles.details}>
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleInputChange}
                  className={styles.editInput}
                  placeholder="University Name"
                />
              </div>
              
              <div className={styles.formRow}>
                <select
                  name="degreeLevel"
                  value={formData.degreeLevel}
                  onChange={handleInputChange}
                  className={styles.editSelect}
                >
                  <option value="">Select Degree Level</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="Ph.D.">Ph.D.</option>
                  <option value="Associate">Associate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
              
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  className={styles.editInput}
                  placeholder="Course Name"
                />
              </div>
              
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={styles.editInput}
                  placeholder="Major (Optional)"
                />
              </div>
              
              <div className={styles.formRow}>
                <label className={styles.dateLabel}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.editDate}
                />
              </div>
              
              <div className={styles.formRow}>
                <label className={styles.dateLabel}>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.editDate}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.instituteName}>{education.instituteName}</div>
              <div className={styles.infoWrapper}>
                <div className={styles.degree}>{education.degree}</div>
                <div className={styles.duration}>{education.duration}</div>
              </div>
            </>
          )}
        </div>
        
        <img
          src="/images/pencil.png"
          className={styles.edit}
          onClick={handleEdit}
          style={{ cursor: "pointer" }}
          alt="Edit"
        />
        <img
          src="/images/trash.png"
          className={styles.delete}
          onClick={handleRemove}
          style={{ cursor: "pointer" }}
          alt="Delete"
        />
      </div>
    </div>
  );
};
