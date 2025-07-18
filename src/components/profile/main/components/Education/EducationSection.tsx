import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EducationSection.module.css";
import { EducationCard } from "./EducationCard.tsx";
import { EducationItem } from "./types";
import { useUser } from "@clerk/clerk-react";
import AddEducationForm from "./Form/form.jsx";

export const EducationSection: React.FC = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
       
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile/getEducation`, {email});

        setEducationList(
          response.data.map((education: any) => ({
            id: education.id,
            logoSrc:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/6042e125a07a11ce877e58b39f0d685bbd41cc0f9011cb3e24150e748ff530d9?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
            instituteName: education.universityName,
            degree: `${education.degreeLevel}, ${education.courseName}`,
            degreeLevel: education.degreeLevel,
            courseName: education.courseName,
            major: education.major || "N/A",
            startDate: education.startDate,
            endDate: education.endDate,
            duration: `${new Date(education.startDate).getFullYear()} - ${
              education.endDate ? new Date(education.endDate).getFullYear() : "Present"
            }`,
          }))
        );
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [email]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/deleteEducation/${id}`, {
        data: { email },
      });
      setEducationList((prevList) => prevList.filter((edu) => edu.id !== id));
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleUpdateEducation = async (id: string, updatedData: any) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/profile/updateEducation/${id}`, {
        email,
        ...updatedData
      });
      
      // Update the local state with the updated education
      setEducationList((prevList) => 
        prevList.map((edu) => 
          edu.id === id 
            ? { 
                ...edu, 
                instituteName: updatedData.universityName,
                degree: `${updatedData.degreeLevel}, ${updatedData.courseName}`,
                degreeLevel: updatedData.degreeLevel,
                courseName: updatedData.courseName,
                major: updatedData.major || "N/A",
                startDate: updatedData.startDate,
                endDate: updatedData.endDate,
                duration: `${new Date(updatedData.startDate).getFullYear()} - ${
                  updatedData.endDate ? new Date(updatedData.endDate).getFullYear() : "Present"
                }`,
              } 
            : edu
        )
      );
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleAddEducation = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveEducation = async (newEducation: EducationItem) => {
    setEducationList((prevList) => [...prevList, newEducation]);
    handleClosePopup();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Education</h1>
        <p className={styles.subtitle}>Your education details</p>
      </div>
      <div className={styles.content}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          educationList.map((education) => (
            <EducationCard
              key={education.id}
              education={education}
              onDelete={() => handleDelete(education.id)}
              onUpdate={(updatedData) => handleUpdateEducation(education.id, updatedData)}
            />
          ))
        )}
      </div>

      {/* Add Education Button */}
      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={handleAddEducation}
          aria-label="Add education"
        >
          <div className={styles.addText}>
            <img src="/images/plus.png" className={styles.plus} alt="Add" />
            Add Education
          </div>
        </button>
      </div>

      {/* Add Education Popup */}
      {showPopup && <AddEducationForm onSave={handleSaveEducation} onClose={handleClosePopup} />}
    </div>
  );
};
