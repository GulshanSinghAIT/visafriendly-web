import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExperienceCard } from "./ExperienceCard";
import styles from "./WorkExperience.module.css";
import { NavigationBar } from "../NavigationBar/Navigation";
import AddExperienceForm from "./Form/form";
import { useUser } from "@clerk/clerk-react";
import { JobDescriptionDisplay } from "./JobDescriptionDisplay";

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
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescriptionData, setJobDescriptionData] = useState(null);

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

  useEffect(() => {
    // Set the sample job data when component mounts
    setJobDescriptionData(sampleJobData);
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateExperience = (updatedExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      )
    );
  };

  const handleDeleteExperience = () => {
    // Refresh the experiences list after deletion
    fetchWorkExperiences();
  };

  // Example job description data from your API response
  const sampleJobData = `<strong>Company Description:</strong><p>*Next level Incorporation*</p><p><br /></p><strong>Job Description:</strong><p>We are urgently looking for a Strong backend Java resource experience in PHP development experience ( front end). This is a full stack position with Java and PHP.</p><p>• Experience writing high-quality, high-performance, maintainable Java, and additional experience in, or strong familiarity with, OO PHP.</p><p>• Experience with MVC frameworks (Symfony and/or spring or others)</p><p>• Experience with ORMs (Doctrine and/or Hibernate or others)</p><p>• Solid understanding of relational databases</p><p>• Strong oral and written communication skills</p><p>• Excellent software engineering habits: object oriented design, unit testing, integration testing, data structures etc.</p><p>• BS or MS degree in Computer Science</p><p>Preferred: </p><p>• Oracle</p><p>• Knowledge of SEM/Paid Search</p><p><b></b></p><strong>Additional Information:</strong><p>All your information will be kept confidential according to EEO guidelines.</p>`;

  return (
    <div className={styles.profileContainer}>
      <NavigationBar />
      <main className={styles.container}>
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Your Work Experience</h1>
              <p className={styles.subtitle}>
                Tell us about yourself so that we know who you are.
              </p>
            </div>
          </header>

          {/* Job Description Display */}
          {jobDescriptionData && (
            <JobDescriptionDisplay jobData={jobDescriptionData} />
          )}

          {isLoading ? (
            <p className={styles.loading}>Loading work experiences...</p>
          ) : experiences.length > 0 ? (
            experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
                onDelete={handleDeleteExperience}
                onUpdate={handleUpdateExperience}
              />
            ))
          ) : (
            <p className={styles.noExperience}>No work experiences found.</p>
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
              onSave={(newExperience) => {
                setExperiences((prev) => [
                  ...prev,
                  {
                    ...newExperience,
                    companyLogo:
                      staticImages[prev.length % staticImages.length],
                  },
                ]);
                handleClosePopup();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};
