import React from "react";
import styles from "./JobDescriptionDisplay.module.css";

export const JobDescriptionDisplay = ({ jobData }) => {
  if (!jobData) {
    return <div className={styles.noData}>No job data available</div>;
  }

  // Helper function to clean HTML tags and formatting
  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/\*/g, '') // Remove asterisks
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  // Parse the job description text to extract sections
  const parseJobDescription = (description) => {
    const sections = {
      companyDescription: "",
      jobDescription: "",
      additionalInformation: ""
    };

    // Split by strong tags to separate sections
    const parts = description.split(/<strong>|<\/strong>/);
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (part === "Company Description:") {
        sections.companyDescription = parts[i + 1] || "";
      } else if (part === "Job Description:") {
        sections.jobDescription = parts[i + 1] || "";
      } else if (part === "Additional Information:") {
        sections.additionalInformation = parts[i + 1] || "";
      }
    }

    return sections;
  };

  const sections = parseJobDescription(jobData);

  // Helper function to format bullet points
  const formatBulletPoints = (text) => {
    if (!text) return [];
    
    // Split by bullet points and format
    return text
      .split(/•|<\/p>/)
      .filter(item => item.trim())
      .map((item, index) => {
        const cleanItem = cleanText(item);
        if (cleanItem && !cleanItem.includes("Preferred:")) {
          return <li key={index} className={styles.bulletPoint}>{cleanItem}</li>;
        }
        return null;
      })
      .filter(Boolean);
  };

  // Extract preferred section separately
  const extractPreferredSection = (text) => {
    if (!text) return [];
    
    const preferredMatch = text.match(/Preferred:\s*(.*?)(?=<strong>|$)/s);
    if (preferredMatch) {
      const preferredText = preferredMatch[1];
      return preferredText
        .split(/•|<\/p>/)
        .filter(item => item.trim())
        .map((item, index) => {
          const cleanItem = cleanText(item);
          if (cleanItem) {
            return <li key={index} className={styles.bulletPoint}>{cleanItem}</li>;
          }
          return null;
        })
        .filter(Boolean);
    }
    return [];
  };

  const preferredItems = extractPreferredSection(sections.jobDescription);

  return (
    <div className={styles.jobDescriptionContainer}>
      <div className={styles.jobDescriptionCard}>
        <div className={styles.jobDescriptionHeader}>
          <h2 className={styles.jobDescriptionTitle}>Job Details</h2>
        </div>

        <div className={styles.jobDescriptionContent}>
          {/* Company Description Section */}
          {sections.companyDescription && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Company Description</h3>
              <div className={styles.sectionContent}>
                {cleanText(sections.companyDescription)}
              </div>
            </div>
          )}

          {/* Job Description Section */}
          {sections.jobDescription && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Job Description</h3>
              <div className={styles.sectionContent}>
                <p className={styles.mainDescription}>
                  {cleanText(sections.jobDescription.split(/<p>|<\/p>/)[0])}
                </p>
                
                {/* Requirements */}
                <div className={styles.requirementsSection}>
                  <h4 className={styles.requirementsTitle}>Requirements:</h4>
                  <ul className={styles.bulletList}>
                    {formatBulletPoints(sections.jobDescription)}
                  </ul>
                </div>

                {/* Preferred Skills */}
                {preferredItems.length > 0 && (
                  <div className={styles.requirementsSection}>
                    <h4 className={styles.requirementsTitle}>Preferred:</h4>
                    <ul className={styles.bulletList}>
                      {preferredItems}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Information Section */}
          {sections.additionalInformation && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Additional Information</h3>
              <div className={styles.sectionContent}>
                {cleanText(sections.additionalInformation)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
