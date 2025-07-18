import React, { useState } from "react";
import styles from "./ResumeItem.module.css";

// Utility function to truncate file name
const truncateFileName = (fileName, maxLength = 20) => {
  if (fileName.length <= maxLength) return fileName;

  const extensionStart = fileName.lastIndexOf(".");
  const extension = fileName.slice(extensionStart);
  const nameWithoutExtension = fileName.slice(0, extensionStart);

  if (nameWithoutExtension.length > maxLength) {
    return nameWithoutExtension.slice(0, maxLength - 3) + "..." + extension;
  }

  return fileName;
};

export function ResumeItem({
  id,
  fileName,
  fileSize,
  uploadDate,
  iconSrc,
  actionIconSrc,
  isDefault,
  onDelete,
  onSetDefault,
}) {
  return (
    <>
      <div
        className={`${styles.resumeItem} ${
          fileName.endsWith(".pdf") ? styles.pdfItem : ""
        }`}
      >
        <div className={styles.contentWrapper}>
          <img
            loading="lazy"
            src={iconSrc}
            className={styles.fileIcon}
            alt="PDF file icon"
          />
          <div className={styles.fileDetails}>
            <div
              className={styles.fileName}
              title={fileName} // Show full name on hover
            >
              {truncateFileName(fileName)}
            </div>
            <div className={styles.fileInfo}>
              {fileSize} | Uploaded on {uploadDate}
            </div>
          </div>
        </div>
        <div className={styles.actionWrapper}>
          {isDefault ? (
            <button className={`${styles.defaultButton}`} disabled>
              Default Resume
            </button>
          ) : (
            <button
              className={`${styles.makeDefaultButton}`}
              onClick={() => onSetDefault(id)}
            >
              Mark as Default
            </button>
          )}
          <img
            loading="lazy"
            src={actionIconSrc}
            className={styles.actionIcon}
            alt="Delete icon"
            role="button"
            tabIndex={0}
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
    </>
  );
}

export default function ResumeList({ resumes }) {
  const [resumeList, setResumeList] = useState(resumes);

  const handleSetDefault = (id) => {
    setResumeList((prevList) => {
      const updatedList = prevList.map((resume) => ({
        ...resume,
        isDefault: resume.id === id,
      }));
      const selectedResume = updatedList.find((resume) => resume.id === id);
      const otherResumes = updatedList.filter((resume) => resume.id !== id);
      return [selectedResume, ...otherResumes]; // Move the selected resume to the top
    });
  };

  const handleDelete = (id) => {
    setResumeList((prevList) => prevList.filter((resume) => resume.id !== id));
  };

  return (
    <div>
      {resumeList.map((resume) => (
        <ResumeItem
          key={resume.id}
          {...resume}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      ))}
    </div>
  );
}
