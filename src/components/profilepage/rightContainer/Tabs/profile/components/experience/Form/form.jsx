import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AddExperienceForm = ({ onClose, onSave, editData = null }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentWork, setCurrentWork] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const isEditMode = !!editData;

  // Load existing data if in edit mode
  useEffect(() => {
    if (editData) {
      setCompanyName(editData.companyName || "");
      setCompanyDomain(editData.companyDomain || "");
      setJobTitle(editData.jobTitle || "");
      setDescription(editData.description || "");
      
      // Handle dates - convert from display format to input format
      if (editData.startDate) {
        const startDateObj = new Date(editData.startDate);
        setStartDate(startDateObj.toISOString().split('T')[0]);
      }
      
      if (editData.endDate) {
        const endDateObj = new Date(editData.endDate);
        setEndDate(endDateObj.toISOString().split('T')[0]);
        setCurrentWork(false);
      } else {
        setCurrentWork(true);
        setEndDate("");
      }
    }
  }, [editData]);

  const handleSaveChanges = async () => {
    if (!email) {
      setError("User email is missing. Please log in again.");
      return;
    }

    // Validation
    if (!companyName || !jobTitle || !startDate) {
      setError("Company name, job title, and start date are required.");
      return;
    }

    try {
      const experienceData = {
        companyName,
        companyDomain,
        jobTitle,
        startDate,
        endDate: currentWork ? null : endDate,
        currentWork,
        description,
        email,
      };

      if (isEditMode) {
        // Update existing experience
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/profile/updateWorkCard/${editData.id}`,
          experienceData
        );
        
        if (response.data.success) {
          onSave({
            id: editData.id,
            ...experienceData,
            companyLogo: editData.companyLogo
          });
        } else {
          throw new Error("Failed to update experience");
        }
      } else {
        // Create new experience
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/profile/workExperience`,
          experienceData
        );
        onSave(response.data.experience);
      }

      onClose();
    } catch (error) {
      console.error("Error saving experience:", error);
      setError("Failed to save experience. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? 'Edit Work Experience' : 'Add Work Experience'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Company Information Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="companyDomain" className="block text-sm font-medium text-gray-700">
                Company Domain
              </label>
              <input
                type="text"
                id="companyDomain"
                value={companyDomain}
                onChange={(e) => setCompanyDomain(e.target.value)}
                className="w-full text-base  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="e.g., company.com"
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full text-base  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
              placeholder="Enter job title"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-base  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full text-base  px-4 py-3 border border-gray-300 rounded-lg transition-colors duration-200 ${
                  currentWork 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
                disabled={currentWork}
              />
            </div>
          </div>

          {/* Currently Working Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="currentWork"
              checked={currentWork}
              onChange={(e) => {
                setCurrentWork(e.target.checked);
                if (e.target.checked) setEndDate("");
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="currentWork" className="text-sm font-medium text-gray-700">
              I currently work here
            </label>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 resize-none"
              placeholder="Describe your role, responsibilities, and achievements..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
          >
            {isEditMode ? 'Update Experience' : 'Save Experience'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceForm;
