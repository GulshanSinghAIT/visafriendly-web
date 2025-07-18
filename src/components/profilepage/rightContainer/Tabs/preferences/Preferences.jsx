import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Preferences.module.css";
import {
  roles,
  jobTypes,
} from "./data/steps";
import { useUser } from "@clerk/clerk-react";
import { MultiSelectDropdown } from "./components/MultiSelectDropdown";
export const Preferences = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(null);

  const fetchPreferences = async () => {
    try {
      console.log("email", email);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/onboarding/getpreferences`,
        {
          params: {
            email: email,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchPreferences();
    }
  }, [email]);

  useEffect(() => {
    if (data) {
      if (data.workSettings) {
        const roleIds = roles
          .filter((role) => data.workSettings.includes(role.label))
          .map((role) => role.id);
        setSelectedRoles(roleIds);
      }
      if (data.jobTypes) {
        const jobTypeIds = jobTypes
          .filter((jobType) => data.jobTypes.includes(jobType.label))
          .map((jobType) => jobType.id);
        setSelectedJobTypes(jobTypeIds);
      }
      if (data.expectedSalary) {
        setExpectedSalary(String(data.expectedSalary));
      }
    }
  }, [data]);

  const handleSubmit = async () => {
    // Validate required fields
    setIsSubmitting(true);

    if (selectedRoles.length === 0) {
      alert("Please select at least one role");
      return;
    }
    if (selectedRoles.length > 5) {
      alert("You can select up to 5 roles.");
      return;
    }

    if (selectedJobTypes.length === 0) {
      alert("Please select at least one job type");
      return;
    }
    if (selectedJobTypes.length > 2) {
      alert("You can select up to 2 job types.");
      return;
    }

    if (!expectedSalary || expectedSalary.trim() === "") {
      alert("Please enter your expected salary");
      return;
    }

    const salary = parseFloat(expectedSalary);
    if (isNaN(salary) || salary < 0) {
      alert("Please enter a valid salary amount");
      return;
    }

    // Map selected IDs to names
    const roleNames = selectedRoles.map(
      (id) => roles.find((r) => r.id === id)?.label
    );

    const jobTypeNames = selectedJobTypes.map(
      (id) => jobTypes.find((jt) => jt.id === id)?.label
    );

    const formData = {
      workSettings: roleNames,
      jobTypes: jobTypeNames,
      expectedSalary: salary,
      email,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/preferences`,
        formData
      );
      if (response.status === 200) {
        alert("Preferences updated successfully");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert(
        error.response?.data?.message ||
        "Error updating preferences. Please try again."
      );
      setIsSubmitting(false);
    }

  };




  return (
    <main className={styles.container}>
      <h1 className="text-2xl text-start font-semibold">
        Preferences
      </h1>
      <div className={styles.mainContent}>
        <div className={styles.formCard}>
          <section className={styles.section}>
            <p className={styles.sectionDescription}>
              What kind of roles are you interested in?
            </p>
            <MultiSelectDropdown
              options={roles}
              selectedValues={selectedRoles}
              onChange={setSelectedRoles}
              placeholder="Select up to 5"
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
              placeholder="Select up to 2"
            />
          </section>

          <section className={styles.section}>
            <p className={styles.sectionDescription}>
              What is the minimum expected salary?
            </p>
            <div className={styles.salaryInputContainer}>
              <input
                type="text"
                className={styles.salaryInput}
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="At least $100 per year"
              />
            </div>
          </section>

          <div className="flex flex-row gap-2 pt-6 border-t-[1.6px] border-[#D9D9D9] justify-end">
            <button
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
            <button
              className={`${styles.button} ${styles.continueButton}`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </main>

  );
};
