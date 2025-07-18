import React from "react";
import styles from "./WorkExperience.module.css";

export const ExperienceForm = () => {
  return (
    <form className={styles.experienceForm}>
      <div className={styles.formContent}>
        <div className={styles.formField}>
          <label htmlFor="companyName" className={styles.fieldLabel}>
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className={styles.fieldInput1}
            placeholder="Enter Company Name"
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="title" className={styles.fieldLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.fieldInput1}
            placeholder="Enter Title"
          />
        </div>

        <div className={styles.dateFields}>
          <div className={styles.dateField}>
            <label htmlFor="startDate" className={styles.fieldLabel}>
              Start Date
            </label>
            <input type="date" id="startDate" className={styles.fieldInput} />
          </div>

          <div className={styles.dateField}>
            <label htmlFor="endDate" className={styles.fieldLabel}>
              End Date
            </label>
            <input type="date" id="endDate" className={styles.fieldInput} />
          </div>
        </div>

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="currentWork"
            className={styles.checkboxInput}
          />
          <label htmlFor="currentWork" className={styles.checkboxLabel}>
            I currently work here
          </label>
        </div>

        <div className={styles.formField}>
          <label htmlFor="description" className={styles.fieldLabel}>
            Description
          </label>
          <textarea
            id="description"
            className={`${styles.fieldInput} ${styles.descriptionInput}`}
            placeholder="Enter Description"
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.saveButton}`}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
