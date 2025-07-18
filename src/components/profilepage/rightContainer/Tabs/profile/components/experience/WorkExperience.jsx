import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExperienceCard } from "./ExperienceCard";
import styles from "./WorkExperience.module.css";
import AddExperienceForm from "./Form/form";
import { useUser } from "@clerk/clerk-react";

const staticImages = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/5dbe9a8edfb9ee1b25c8900020dd9792a6e8fe3d224f2739d222565ac9166a34?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/60fbb380963ec8a2ad27503c378518cbde991dd28b5936bf6b8498575a7b900f?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
];

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";

  // Parse the date string (assuming YYYY-MM-DD format)
  const [year, month, day] = dateString.slice(0, 10).split("-").map(Number);

  // Create a Date object
  const date = new Date(year, month - 1, day);

  // Format the date
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const WorkExperience = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkExperiences = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getWorkCards`,
        { email }
      );

      if (Array.isArray(response.data.workExperiences)) {
        const updatedExperiences = response.data.workExperiences.map(
          (experience, index) => {
            // Format duration
            const startDate = formatDate(experience.startDate);
            const endDate = experience.endDate
              ? formatDate(experience.endDate)
              : "Present";

            const duration = `${startDate} - ${endDate}`;

            return {
              id: experience.id,
              jobTitle: experience.title, // Ensure jobTitle is mapped
              companyName: experience.companyName,
              companyDomain: experience.companyDomain,
              duration: duration,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.endDate,
              companyLogo: staticImages[index % staticImages.length], // Assign images cyclically
            };
          }
        );
        setExperiences(updatedExperiences);
      } else {
        setExperiences([]);
      }
    } catch (error) {
      console.error("Error fetching work experiences:", error);
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchWorkExperiences();
    }
  }, [email]);

  const handleOpenPopup = () => {
    setEditData(null); // Clear any edit data
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditData(null); // Clear edit data when closing
  };

  const handleEditExperience = (experienceData) => {
    setEditData(experienceData);
    setShowPopup(true);
  };

  const handleSaveExperience = () => {
    fetchWorkExperiences(); // Refresh the experiences list
    setShowPopup(false);
    setEditData(null);
  };

  const handleDeleteExperience = () => {
    // Refresh the experiences list after deletion
    fetchWorkExperiences();
  };

  return (
        <div className={styles.mainContent}>   
          {isLoading ? (
            <p className={styles.loading}>Loading work experiences...</p>
          ) : experiences.length > 0 ? (
            experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
                onDelete={handleDeleteExperience}
                onEdit={handleEditExperience}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>💡</span>
                    <span>No work experiences found.</span>
                </div>
          )}

          <button className={styles.addExperience} onClick={handleOpenPopup}>
            <div className={styles.add}>
              <img src="/images/plus.png" className={styles.plus} alt="Add" />
              Add another Experience
            </div>
          </button>

          {showPopup && (
            <AddExperienceForm
              onClose={handleClosePopup}
              onSave={handleSaveExperience}
              editData={editData}
            />
          )}
        </div>
  );
};
