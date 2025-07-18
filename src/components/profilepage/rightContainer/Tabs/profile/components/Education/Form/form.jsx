import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./form.module.css";
import { useUser } from "@clerk/clerk-react";

const schoolOptions = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "University of California, Berkeley",
  "Other"
];

const majorOptions = [
  "Computer Science",
  "Business",
  "Engineering",
  "Mathematics",
  "Other"
];

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

const AddEducationForm = ({ onClose, onSave, editData = null }) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const isEditMode = !!editData;
  
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

  // Load existing data if in edit mode
  useEffect(() => {
    if (editData) {
      // Parse the existing data to match our form structure
      const parseEducationData = (data) => {
        // Handle different data formats from the API
        if (data.universityName) {
          // Profile API format
          const startDateParts = data.startDate ? data.startDate.split(' ') : ['', ''];
          const endDateParts = data.endDate ? data.endDate.split(' ') : ['', ''];
          
          return {
            id: data.id,
            school: data.universityName || "",
            major: data.courseName || data.major || "",
            degree: data.degreeLevel || data.degree || "",
            gpa: data.gpa || "",
            startMonth: startDateParts[0] || "",
            startYear: startDateParts[1] || "",
            endMonth: endDateParts[0] || "",
            endYear: endDateParts[1] || ""
          };
        } else {
          // Onboarding API format
          return {
            id: data.id,
            school: data.school || "",
            major: data.major || "",
            degree: data.degree || "",
            gpa: data.gpa || "",
            startMonth: data.startMonth || "",
            startYear: data.startYear || "",
            endMonth: data.endMonth || "",
            endYear: data.endYear || ""
          };
        }
      };

      const parsedData = parseEducationData(editData);
      setEducations([parsedData]);
    }
  }, [editData]);

  const handleEducationChange = (idx, field, value) => {
    const updated = educations.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu
    );
    setEducations(updated);
  };

  const handleAddEducation = () => {
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
  };

  const handleSaveChanges = async () => {
    try {
      // Validate years
      const hasInvalidYears = educations.some(edu =>
        parseInt(edu.startYear) > parseInt(edu.endYear)
      );

      if (hasInvalidYears) {
        alert('Start year cannot be after end year');
        return;
      }

      if (isEditMode) {
        // Update existing education using onboarding API
        const education = educations[0];
        const updateData = {
          email: email,
          school: education.school,
          major: education.major,
          degree: education.degree,
          gpa: education.gpa,
          startMonth: education.startMonth,
          startYear: education.startYear,
          endMonth: education.endMonth,
          endYear: education.endYear,
        };

        await axios.put(`${process.env.REACT_APP_API_URL}/onboarding/education/${education.id}`, updateData);
        onSave([updateData]);
      } else {
        // Create new education entries
        const formattedEducations = educations.map(edu => ({
          school: edu.school,
          major: edu.major,
          degree: edu.degree,
          gpa: edu.gpa,
          startMonth: edu.startMonth,
          startYear: edu.startYear,
          endMonth: edu.endMonth,
          endYear: edu.endYear,
          email: email,
        }));

        // Save each education entry
        for (const education of formattedEducations) {
          await axios.post(`${process.env.REACT_APP_API_URL}/onboarding/education`, education);
        }

        onSave(formattedEducations);
      }

      // Remove the page reload - let the parent component handle UI updates
      onClose();
    } catch (error) {
      console.error("Error saving education data:", error);
      alert("Error saving education data. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-y-auto w-full max-w-4xl max-h-[90vh] relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {isEditMode ? 'Edit Education' : 'Add Education'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img
                src="/images/x.png"
                alt="Close"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {educations.map((edu, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <div className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                {isEditMode ? 'Edit Education' : `Education ${idx + 1}`}
              </div>
              
              {/* University and Major Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor={`school-${idx}`} className="block text-sm font-medium text-gray-700">
                    University Name
                  </label>
                  <select
                    id={`school-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(idx, "school", e.target.value)}
                    required
                  >
                    <option value="">Select University</option>
                    {schoolOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor={`major-${idx}`} className="block text-sm font-medium text-gray-700">
                    Major
                  </label>
                  <select
                    id={`major-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.major}
                    onChange={(e) => handleEducationChange(idx, "major", e.target.value)}
                    required
                  >
                    <option value="">Select Major</option>
                    {majorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Degree and GPA Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor={`degree-${idx}`} className="block text-sm font-medium text-gray-700">
                    Degree Level
                  </label>
                  <select
                    id={`degree-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                    required
                  >
                    <option value="">Select Degree Type</option>
                    {degreeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor={`gpa-${idx}`} className="block text-sm font-medium text-gray-700">
                    GPA
                  </label>
                  <input
                    type="text"
                    id={`gpa-${idx}`}
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(idx, "gpa", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter GPA"
                  />
                </div>
              </div>

              {/* Start Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor={`startMonth-${idx}`} className="block text-sm font-medium text-gray-700">
                    Start Month
                  </label>
                  <select
                    id={`startMonth-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.startMonth}
                    onChange={(e) => handleEducationChange(idx, "startMonth", e.target.value)}
                    required
                  >
                    <option value="">Select Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor={`startYear-${idx}`} className="block text-sm font-medium text-gray-700">
                    Start Year
                  </label>
                  <select
                    id={`startYear-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(idx, "startYear", e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* End Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor={`endMonth-${idx}`} className="block text-sm font-medium text-gray-700">
                    End Month
                  </label>
                  <select
                    id={`endMonth-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.endMonth}
                    onChange={(e) => handleEducationChange(idx, "endMonth", e.target.value)}
                    required
                  >
                    <option value="">Select Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor={`endYear-${idx}`} className="block text-sm font-medium text-gray-700">
                    End Year
                  </label>
                  <select
                    id={`endYear-${idx}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(idx, "endYear", e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Action Buttons - Only show for create mode */}
              {!isEditMode && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                  <button 
                    type="button" 
                    onClick={handleAddEducation} 
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <span className="text-lg mr-1">+</span> Add Education
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleClearEducation(idx)} 
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <span className="text-base mr-1">⭮</span> Clear Data
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditMode ? 'Update Education' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEducationForm;
