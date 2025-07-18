import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";
import { useUser } from "@clerk/clerk-react";

const AddExperienceForm = ({ onClose, onSave }) => {
  const [companyName, setCompanyName] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [major, setMajor] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentWork, setCurrentWork] = useState(false);
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).getFullYear().toString();
  };

  const handleSaveChanges = async () => {
    const formattedEndDate = currentWork ? "Present" : formatDate(endDate);

    const newEducation = {
      universityName: companyName,
      courseName: jobTitle,
      degreeLevel,
      major,
      startDate,
      endDate: currentWork ? null : endDate,
      email: email,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/profile/education`, newEducation);
      onSave(newEducation);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error saving education data:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Education</h2>
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
                University Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.input}
                placeholder="Enter University Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="title" className={styles.label}>
                Course
              </label>
              <input
                type="text"
                id="title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter Course Name"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="degreeLevel" className={styles.label}>
                Degree Level
              </label>
              <input
                type="text"
                id="degreeLevel"
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                className={styles.input}
                placeholder="Enter Your Degree Level"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="major" className={styles.label}>
                Major
              </label>
              <select
                id="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className={styles.select}
              >
                <option value="" disabled hidden>
                  Select Your Major
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
              </select>
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
                disabled={currentWork}
              />
            </div>
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
