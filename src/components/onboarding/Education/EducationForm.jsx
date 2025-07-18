import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FormInput } from "./FormInput";
import { SearchableDropdown } from "./SearchableDropdown";
import styles from "./EducationForm.module.css";
import { steps } from "../preferences/data/steps";
import { ProgressSteps } from "../preferences/components/ProgressSteps";
import { useUser } from "@clerk/clerk-react";
import universityNames from "./university_names.json";
import majorNames from "./major_names.json";

// Removed schoolOptions and majorOptions as we're now using the SearchableDropdown component
const degreeOptions = [
  "Bachelor's",
  "Master's",
  "PhD",
  "Diploma",
  "Other"
];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const years = Array.from({ length: 50 }, (_, i) => 1980 + i);

export function EducationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const useremail = user?.emailAddresses[0]?.emailAddress;
  const [educations, setEducations] = useState([
    {
      school: "",
      major: "",
      degree: "",
      gpa: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: ""
    }
  ]);

  const [showOtherSchool, setShowOtherSchool] = useState(false);
  const [showOtherMajor, setShowOtherMajor] = useState(false);

  // Validation function to check if an education entry is complete
  const isEducationValid = (education) => {
    // Check if school is filled (either selected from dropdown or entered as "Other")
    const schoolValid = education.school && education.school.trim() !== '';
    
    // Check if major is filled (either selected from dropdown or entered as "Other")
    const majorValid = education.major && education.major.trim() !== '';
    
    // Check if degree is selected
    const degreeValid = education.degree && education.degree.trim() !== '';
    
    // Check if start month and year are selected
    const startValid = education.startMonth && education.startYear;
    
    // Check if end month and year are selected
    const endValid = education.endMonth && education.endYear;
    
    // Check if end date is after start date
    const dateValid = startValid && endValid && 
      parseInt(education.startYear) <= parseInt(education.endYear);
    
    return schoolValid && majorValid && degreeValid && startValid && endValid && dateValid;
  };

  // Check if current education (last one) is valid
  const isCurrentEducationValid = () => {
    const currentEducation = educations[educations.length - 1];
    return isEducationValid(currentEducation);
  };

  const handleEducationChange = (idx, field, value) => {
    const updated = educations.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu
    );
    setEducations(updated);
  };

  const handleAddEducation = () => {
    // Only allow adding new education if current one is valid
    if (!isCurrentEducationValid()) {
      alert('Please complete the current education form before adding another one.');
      return;
    }
    
    setEducations([
      ...educations,
      {
        school: "",
        major: "",
        degree: "",
        gpa: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: ""
      }
    ]);
    setShowOtherSchool(false);
    setShowOtherMajor(false);
  };

  const handleClearEducation = (idx) => {
    const updated = educations.map((edu, i) =>
      i === idx
        ? {
          school: "",
          major: "",
          degree: "",
          gpa: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: ""
        }
        : edu
    );
    setEducations(updated);
    setShowOtherSchool(false);
    setShowOtherMajor(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get email from localStorage
      const email = useremail;
      if (!email) {
        setError('Email not found. Please log in again.');
        return;
      }

      // Validate all educations
      const invalidEducations = educations.filter(edu => !isEducationValid(edu));
      
      if (invalidEducations.length > 0) {
        setError('Please complete all education entries before continuing');
        setLoading(false);
        return;
      }

      // Validate years
      const hasInvalidYears = educations.some(edu =>
        parseInt(edu.startYear) > parseInt(edu.endYear)
      );

      if (hasInvalidYears) {
        setError('Start year cannot be after end year');
        setLoading(false);
        return;
      }

      // Format the data
      const formattedData = {
        email,
        ...educations[0] // Since we're only handling one education entry at a time
      };

      console.log('Submitting form data:', formattedData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/onboarding/education`, formattedData);
      console.log('Server response:', response.data);
      navigate("/onboarding/ExperienceDetails");
    } catch (error) {
      console.error("Error submitting education:", error.response?.data || error.message);
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
        <ProgressSteps steps={steps} currentPage={3} />
        <h1 className={styles.title}>Add your education</h1>
        <form onSubmit={handleSubmit} className={styles.onboardingForm}>
          {educations.map((edu, idx) => (
            <div key={idx} className={styles.formGrid} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
              <div className={styles.fullWidth} style={{ fontWeight: 600, fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Education {idx + 1}</span>
                <span style={{ 
                  fontSize: 12, 
                  padding: '4px 8px', 
                  borderRadius: 12, 
                  backgroundColor: isEducationValid(edu) ? '#e6f4ea' : '#fff3e0', 
                  color: isEducationValid(edu) ? '#2e7d32' : '#f57c00',
                  fontWeight: 500
                }}>
                  {isEducationValid(edu) ? '✓ Complete' : '⚠ Incomplete'}
                </span>
              </div>
              {/* School Name */}
              <div>
                <label htmlFor={`school-${idx}`} className={styles.label}>School Name</label>
                <SearchableDropdown
                  id={`school-${idx}`}
                  value={edu.school}
                  onChange={(value) => handleEducationChange(idx, 'school', value)}
                  placeholder="Search for a university..."
                  required={true}
                  data={universityNames}
                  onOtherToggle={setShowOtherSchool}
                />
              </div>
              
              {/* Other School Input */}
              {showOtherSchool && (
                <div className={styles.fullWidth}>
                  <label htmlFor={`other-school-${idx}`} className={styles.label}>Enter School Name</label>
                  <input
                    type="text"
                    id={`other-school-${idx}`}
                    className={styles.selectInput}
                    value={edu.school === 'Other' ? '' : edu.school}
                    onChange={(e) => handleEducationChange(idx, 'school', e.target.value)}
                    placeholder="Enter your school name..."
                    required={true}
                  />
                </div>
              )}
              {/* Major */}
              <div>
                <label htmlFor={`major-${idx}`} className={styles.label}>Major</label>
                <SearchableDropdown
                  id={`major-${idx}`}
                  value={edu.major}
                  onChange={(value) => handleEducationChange(idx, 'major', value)}
                  placeholder="Search for a major..."
                  required={true}
                  data={majorNames}
                  onOtherToggle={setShowOtherMajor}
                />
              </div>
              
              {/* Other Major Input */}
              {showOtherMajor && (
                <div className={styles.fullWidth}>
                  <label htmlFor={`other-major-${idx}`} className={styles.label}>Enter Major</label>
                  <input
                    type="text"
                    id={`other-major-${idx}`}
                    className={styles.selectInput}
                    value={edu.major === 'Other' ? '' : edu.major}
                    onChange={(e) => handleEducationChange(idx, 'major', e.target.value)}
                    placeholder="Enter your major..."
                    required={true}
                  />
                </div>
              )}
              {/* Degree Type */}
              <div>
                <label htmlFor={`degree-${idx}`} className={styles.label}>Degree Type</label>
                <select
                  id={`degree-${idx}`}
                  className={styles.selectInput}
                  value={edu.degree}
                  onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                  required
                >
                  <option value="">Select degree type</option>
                  {degreeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              {/* GPA */}
              <div>
                <FormInput
                  label="GPA"
                  placeholder="Enter GPA"
                  id={`gpa-${idx}`}
                  value={edu.gpa}
                  onChange={e => handleEducationChange(idx, 'gpa', e.target.value)}
                  required={false}
                />
              </div>
              {/* Start Month */}
              <div>
                <label htmlFor={`startMonth-${idx}`} className={styles.label}>Start Month</label>
                <select
                  id={`startMonth-${idx}`}
                  className={styles.selectInput}
                  value={edu.startMonth}
                  onChange={e => handleEducationChange(idx, 'startMonth', e.target.value)}
                  required
                >
                  <option value="">Select month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {/* Start Year */}
              <div>
                <label htmlFor={`startYear-${idx}`} className={styles.label}>Start Year</label>
                <select
                  id={`startYear-${idx}`}
                  className={styles.selectInput}
                  value={edu.startYear}
                  onChange={e => handleEducationChange(idx, 'startYear', e.target.value)}
                  required
                >
                  <option value="">Select year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {/* End Month */}
              <div>
                <label htmlFor={`endMonth-${idx}`} className={styles.label}>End Month</label>
                <select
                  id={`endMonth-${idx}`}
                  className={styles.selectInput}
                  value={edu.endMonth}
                  onChange={e => handleEducationChange(idx, 'endMonth', e.target.value)}
                  required
                >
                  <option value="">Select month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {/* End Year */}
              <div>
                <label htmlFor={`endYear-${idx}`} className={styles.label}>End Year</label>
                <select
                  id={`endYear-${idx}`}
                  className={styles.selectInput}
                  value={edu.endYear}
                  onChange={e => handleEducationChange(idx, 'endYear', e.target.value)}
                  required
                >
                  <option value="">Select year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {/* Add/Clear Buttons */}
              <div className={styles.fullWidth} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={handleAddEducation} 
                  disabled={!isCurrentEducationValid()}
                  style={{ 
                    color: isCurrentEducationValid() ? '#313DEB' : '#999', 
                    background: 'none', 
                    border: 'none', 
                    fontWeight: 500, 
                    cursor: isCurrentEducationValid() ? 'pointer' : 'not-allowed', 
                    fontSize: 16, 
                    display: 'flex', 
                    alignItems: 'center',
                    opacity: isCurrentEducationValid() ? 1 : 0.6
                  }}
                >
                  <span style={{ fontSize: 20, marginRight: 4 }}>+</span> Add Education
                </button>
                <button type="button" onClick={() => handleClearEducation(idx)} style={{ color: '#313DEB', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, marginRight: 4 }}>⭮</span> Clear Data
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
            <button type="button" onClick={() => navigate("/onboarding/resumeCV")} className={styles.submitButton} style={{ background: 'white', color: '#313DEB', border: '1px solid #313DEB', marginRight: 16 }}>Back</button>
            <div className="flex items-center flex-col md:flex-row w-full md:w-auto gap-2">
            <button type="button" onClick={() => navigate("/onboarding/experienceDetails")} className="pb-5 md:pb-0" style={{ background: 'none', border: 'none', color: '#313DEB', fontWeight: 500, fontSize: 16, marginRight: 16, cursor: 'pointer'  }}>Skip this Step</button>
            <button type="submit" className={styles.submitButton}>Save & Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
