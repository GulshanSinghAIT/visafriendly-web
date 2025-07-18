import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ResumeUpload.module.css";
import { ResumeItem } from "./ResumeItem";
import { NavigationBar } from "../NavigationBar/Navigation";
import ResumeProgress from "./ResumeProgress";
import { useUser } from "@clerk/clerk-react";
import useDefaultResumeStore from '../../../store/defaultResumeStore';

// Constants for resume card images
const PDF_ICON =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/f1dd8375a5af3296031fcefe3c6548e05df2b0f212157ea8dedaae6a5719d9ac?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}";
const ACTION_ICON =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/95fbd36175aa814b913df00b5649797f6bee7ca5ee3f7aa114fcae7934f1c7e8?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}";



export function ResumeUpload() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const { setDefaultSkills } = useDefaultResumeStore();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (!email) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/resume/${email}`
        );
        if (response.data.success) {
          setResumes(response.data.resumes);
          // Find and set the default resume skills
          const defaultResume = response.data.resumes.find(resume => resume.isDefault);
          console.log("Found default resume:", defaultResume);
          if (defaultResume) {
            console.log("Setting default skills:", defaultResume.skills);
            setDefaultSkills(defaultResume.skills);
          } else {
            console.log("No default resume found");
          }
          console.log(response.data.resumes);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [email, setDefaultSkills]);

  const handleSetDefault = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/resume/setDefault`,
        {
          resumeId: id,
          email,
        }
      );

      if (response.data.success) {
        setResumes((prevResumes) => {
          const updatedResumes = prevResumes.map((resume) => ({
            ...resume,
            isDefault: resume.id === id,
          }));
          const selectedResume = updatedResumes.find(
            (resume) => resume.id === id
          );
          const otherResumes = updatedResumes.filter(
            (resume) => resume.id !== id
          );
          return [selectedResume, ...otherResumes];
        });
      }
    } catch (error) {
      console.error("Error setting default resume:", error);
      alert("Failed to set default resume. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/profile/resume/${id}`,
        {
          data: { email },
        }
      );

      if (response.data.success) {
        setResumes((prevResumes) =>
          prevResumes.filter((resume) => resume.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume. Please try again.");
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (resumes.length >= 5) {
        alert(
          "Maximum limit of 5 resumes reached. Please delete some resumes before uploading new ones."
        );
        return;
      }

      try {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("email", email);

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/profile/resume/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          const newResume = response.data.resume;
          setResumes((prevResumes) => [newResume, ...prevResumes]);
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Failed to upload resume. Please try again.");
      }
    }
  };

  const toggleSkills = (resumeId) => {
    setSelectedResumeId(selectedResumeId === resumeId ? null : resumeId);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <NavigationBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            

            <div className={styles.searchBar}>
              <div className={styles.searchContainer}>

                <label
                  className={`${styles.uploadButton} ${resumes.length >= 5 ? styles.disabled : ""
                    }`}
                  style={{
                    opacity: resumes.length >= 5 ? 0.5 : 1,
                    cursor: resumes.length >= 5 ? "not-allowed" : "pointer",
                    pointerEvents: resumes.length >= 5 ? "none" : "auto",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                    disabled={resumes.length >= 5}
                  />
                  <div className={styles.uploadButtonContent}>
                    Upload new
                  </div>
                </label>
              </div>
            </div>

            <div >
              <ResumeProgress savedResumes={resumes.length} totalResumes={5} />
            </div>

            <div className={styles.recentUploads}>
              {resumes.map((resume) => (
                <div key={resume.id} className={styles.resumeItem}>
                  <ResumeItem
                    id={resume.id}
                    fileName={resume.fileName}
                    fileSize={resume.fileSize}
                    uploadDate={
                      new Date(resume.createdAt).toISOString().split("T")[0]
                    }
                    iconSrc={PDF_ICON}
                    actionIconSrc={ACTION_ICON}
                    isDefault={resume.isDefault}
                    onDelete={handleDelete}
                    onSetDefault={handleSetDefault}
                  />
                  <button
                    onClick={() => toggleSkills(resume.id)}
                    className={styles.viewSkillsButton}
                  >
                    {Number(selectedResumeId) === Number(resume.id) ? "Hide Skills" : "View Skills"}
                  </button>
                  {Number(selectedResumeId) === Number(resume.id) && (
                    <div className={styles.skillsDropdown}>
                      <div className={styles.skillsContainer}>
                        {resume.skills && resume.skills.length > 0 ? (
                          resume.skills.map((skill, index) => (
                            <span key={index} className={styles.skillTag}>
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className={styles.noSkills}>No skills found</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
