import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AddExperienceForm = ({ onClose, onSave }) => {
  const [keywords, setKeywords] = useState([
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
      setJobTitle(extractJobTitle(newKeyword)); // Set job title based on keyword
    }
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddKeyword();
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/profile/jobAlert`,
        {
          jobTitle,
          keywords,
          location,
          frequency,
          similarJobs: document.getElementById("similarJobs").checked,
          email: email,
        }
      );

      if (response.status === 201) {
        const newAlert = {
          id: response.data.id, // Use returned ID from backend
          title: jobTitle,
          location: location,
          frequency: `Frequency: ${
            frequency.charAt(0).toUpperCase() + frequency.slice(1)
          } via email and Notification`,
          companyLogo: "/images/suitcase.png",
        };

        onSave(newAlert); // Pass the new alert to the parent
        onClose(); // Close the form
        window.location.reload(); // Reload the page to show the new alert
      }
    } catch (error) {
      console.error("Error saving job alert:", error);
    }
  };

  const extractJobTitle = (keyword) => {
    const parts = keyword.split(" - ");
    return parts.length > 0 ? parts[0] : keyword; // Remove the years part (if any)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-blue-50 bg-opacity-30 rounded-t-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Create new Job Alert
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <img
              src="/images/x.png"
              alt="Close"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Frequency Section */}
          <div className="space-y-3">
            <label className="text-sm sm:text-base font-medium text-gray-700">
              Alert Frequency
            </label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={frequency === option.value}
                    onChange={() => setFrequency(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Keywords Section */}
          <div className="space-y-3">
            <label htmlFor="addKeywords" className="text-sm sm:text-base font-medium text-gray-700">
              Add Keywords
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="addKeywords"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter Keywords"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleAddKeyword}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base font-medium"
              >
                Add
              </button>
            </div>
            
            {/* Keywords List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <span className="text-sm sm:text-base text-gray-700 font-medium flex-1">
                    {keyword}
                  </span>
                  <button
                    onClick={() => handleRemoveKeyword(index)}
                    className="ml-2 p-1 hover:bg-red-100 rounded transition-colors duration-200"
                  >
                    <img
                      src="/images/trash.png"
                      alt="Delete"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="similarJobs"
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="similarJobs" className="text-sm sm:text-base text-gray-700 font-medium">
              Get alerts for similar jobs like this
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 sm:p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceForm;
