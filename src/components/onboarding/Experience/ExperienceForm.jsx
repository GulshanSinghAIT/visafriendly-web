import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FormInput } from "./FormInput";
import styles from "./ExperienceForm.module.css";
import { steps } from "../preferences/data/steps";
import { ProgressSteps } from "../preferences/components/ProgressSteps";
import { useUser } from "@clerk/clerk-react";

export function ExperienceForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const useremail = user?.emailAddresses[0]?.emailAddress;
  const [Experiences, setExperiences] = useState([
    {
      companyName: "",
      companyDomain: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      currentWork: false,
      description: ""
    }
  ]);

  const handleExperienceChange = (idx, field, value) => {
    const updated = Experiences.map((exp, i) =>
      i === idx ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...Experiences,
      {
        companyName: "",
        companyDomain: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentWork: false,
        description: ""
      }
    ]);
  };

  const handleClearExperience = (idx) => {
    const updated = Experiences.map((exp, i) =>
      i === idx
        ? {
          companyName: "",
          companyDomain: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          currentWork: false,
          description: ""
        }
        : exp
    );
    setExperiences(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const email = useremail;
      if (!email) {
        setError('Email not found. Please log in again.');
        return;
      }

      // Validate dates
      const hasInvalidDates = Experiences.some(exp => {
        if (exp.currentWork) return false;
        return new Date(exp.startDate) > new Date(exp.endDate);
      });

      if (hasInvalidDates) {
        setError('Start date cannot be after end date');
        setLoading(false);
        return;
      }

      const formattedData = {
        email,
        ...Experiences[0]
      };

      console.log('Submitting form data:', formattedData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile/workExperience`, formattedData);
      console.log('Server response:', response.data);
      navigate("/onboarding/preferences");
    } catch (error) {
      console.error("Error submitting Experience:", error.response?.data || error.message);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className=" absolute top-5 left-3 md:left-10">
        <img src="/images/visafriendly.png" alt="visafriendly" className="h-10" />
      </div>
      <div className={styles.content}>
        <ProgressSteps steps={steps} currentPage={4} />
        <h1 className={styles.title}>Add your Experience</h1>
        <form onSubmit={handleSubmit} className={styles.onboardingForm}>
          {Experiences.map((exp, idx) => (
            <div key={idx} className={styles.formGrid} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
              <div className={styles.fullWidth} style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>Experience {idx + 1}</div>

              {/* Company Name */}
              <div >
                <FormInput
                  label="Company Name"
                  id={`companyName-${idx}`}
                  value={exp.companyName}
                  onChange={e => handleExperienceChange(idx, 'companyName', e.target.value)}
                  placeholder="Enter Company Name"
                  required
                />
              </div>

              {/* Company Domain */}
              <div >
                <FormInput
                  label="Company Domain"
                  id={`companyDomain-${idx}`}
                  value={exp.companyDomain}
                  onChange={e => handleExperienceChange(idx, 'companyDomain', e.target.value)}
                  placeholder="e.g., company.com"
                  required
                />
              </div>

              {/* Job Title */}
              <div >
                <FormInput
                  label="Job Title"
                  id={`jobTitle-${idx}`}
                  value={exp.jobTitle}
                  onChange={e => handleExperienceChange(idx, 'jobTitle', e.target.value)}
                  placeholder="Enter Job Title"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <FormInput
                  label="Start Date"
                  type="date"
                  id={`startDate-${idx}`}
                  value={exp.startDate}
                  onChange={e => handleExperienceChange(idx, 'startDate', e.target.value)}
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <FormInput
                  label="End Date"
                  type="date"
                  id={`endDate-${idx}`}
                  value={exp.endDate}
                  onChange={e => handleExperienceChange(idx, 'endDate', e.target.value)}
                  disabled={exp.currentWork}
                  required={!exp.currentWork}
                />
              </div>

              {/* Currently Working Checkbox */}
              <div className={styles.fullWidth}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={exp.currentWork}
                    onChange={e => {
                      handleExperienceChange(idx, 'currentWork', e.target.checked);
                      if (e.target.checked) {
                        handleExperienceChange(idx, 'endDate', '');
                      }
                    }}
                  />
                  I currently work here
                </label>
              </div>

              {/* Description */}
              <div className={styles.fullWidth + " " + styles.inputGroup}>
                <label htmlFor={`description-${idx}`} className={styles.label}>Description</label>
                <textarea
                  id={`description-${idx}`}
                  className={styles.textarea}
                  value={exp.description}
                  onChange={e => handleExperienceChange(idx, 'description', e.target.value)}
                  placeholder="Type description here"
                  rows={4}
                />
              </div>

              {/* Add/Clear Buttons */}
              <div className={styles.fullWidth} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <button type="button" onClick={handleAddExperience} style={{ color: '#313DEB', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 20, marginRight: 4 }}>+</span> Add Experience
                </button>
                <button type="button" onClick={() => handleClearExperience(idx)} style={{ color: '#313DEB', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, marginRight: 4 }}>⭮</span> Clear Data
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
            <button type="button" onClick={() => navigate("/onboarding/educationDetails")} className={styles.submitButton} style={{ background: 'white', color: '#313DEB', border: '1px solid #313DEB', marginRight: 16 }}>Back</button>
            <div className="flex items-center flex-col md:flex-row w-full md:w-auto gap-2">
           
            <button type="button" onClick={() => navigate("/onboarding/preferences")}  className="pb-5 md:pb-0" style={{ background: 'none', border: 'none', color: '#313DEB', fontWeight: 500, fontSize: 16, marginRight: 16, cursor: 'pointer' }}>Skip this Step</button>
            <button type="submit" className={styles.submitButton}>Save & Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
