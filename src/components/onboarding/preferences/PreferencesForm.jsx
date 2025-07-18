import React, { useState } from "react";
import { ProgressSteps } from "./components/ProgressSteps";
import { MultiSelectDropdown } from "./components/MultiSelectDropdown";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import {
  steps,
  jobTypes,
  workSettings,
} from "./data/steps";
import styles from "./PreferencesForm.module.css";

export const PreferencesForm = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const navigate = useNavigate();
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedWorkSettings, setSelectedWorkSettings] = useState([]);
  const [preferredRoles, setPreferredRoles] = useState();


  const handleSubmit = async () => {
    // Validate required fields


    if (selectedJobTypes.length === 0) {
      alert("Please select at least one job type");
      return;
    }

    if (selectedWorkSettings.length === 0) {
      alert("Please select at least one work setting");
      return;
    }

    if (!preferredRoles || preferredRoles.trim() === "") {
      alert("Please enter your expected salary");
      return;
    }

    const salary = parseFloat(preferredRoles);
    if (isNaN(salary) || salary < 0) {
      alert("Please enter a valid salary amount");
      return;
    }

    // Map selected IDs to names
    const jobTypeNames = selectedJobTypes.map(
      (id) => jobTypes.find((jt) => jt.id === id)?.label
    );

    const workSettingNames = selectedWorkSettings.map(
      (id) => workSettings.find((ws) => ws.id === id)?.label
    );

    const formData = {
      jobTypes: jobTypeNames,
      workSettings: workSettingNames,
      expectedSalary: salary,
      email,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/preferences`,
        formData
      );

      if (response.status === 200) {
        navigate("/onboarding/LinksDetails");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert(
        error.response?.data?.message ||
        "Error updating preferences. Please try again."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className=" absolute top-5 left-3 md:left-10">
        <img src="/images/visafriendly.png" alt="visafriendly" className="h-10" />
      </div>
      <div className={styles.content}>
        <ProgressSteps steps={steps} currentPage={5} />
        <h1 className={styles.title}>Set your preferences for job matching</h1>
        <div className={styles.formCard}>




          <section className={styles.section}>
            <p className={styles.sectionDescription}>
              What kind of roles are you interested in?
            </p>
            <MultiSelectDropdown
              options={workSettings}
              selectedValues={selectedWorkSettings}
              onChange={setSelectedWorkSettings}
              placeholder="Select work settings..."
            />
          </section>

          <section className={styles.section}>

            <p className={styles.sectionDescription}>
              What level of roles are you looking for?
            </p>
            <MultiSelectDropdown
              options={jobTypes}
              selectedValues={selectedJobTypes}
              onChange={setSelectedJobTypes}
              placeholder="Select job types..."
            />
          </section>

          <section className={styles.section}>
            <p className={styles.sectionDescription}>
              What is the minimum expected salary?
            </p>
            <div className={styles.salaryInputContainer}>
              <input
                type="number"
                className={styles.salaryInput}
                onChange={(e) => setPreferredRoles(e.target.value)}
                placeholder="Enter expected salary (e.g., 75000)"
                min="0"
                step="1000"
              />
              <span className={styles.currencyLabel}>USD</span>
            </div>
          </section>

          <div className={styles.formActions}>
            <button
              className={`${styles.button} ${styles.backButton}`}
              onClick={() => navigate("/onboarding/experienceDetails")}
            >
              Back
            </button>
            <div className="flex items-center flex-col md:flex-row w-full md:w-auto gap-2">
              <button type="button" onClick={() => navigate("/onboarding/linksDetails")} style={{ background: 'none', border: 'none', color: '#313DEB', fontWeight: 500, fontSize: 16, marginRight: 16, cursor: 'pointer' }}>Skip this Step</button>
              <button
                className={`${styles.button} ${styles.continueButton}`}
                onClick={handleSubmit}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
