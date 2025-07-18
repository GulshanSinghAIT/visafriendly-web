import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./ResumeUpload.module.css";
import Button from "./Button";
import { ProgressSteps } from "../preferences/components/ProgressSteps";
import { steps } from "../preferences/data/steps";
import { ResumeItem } from "./ResumeItem";
import { recentResumes } from "../../profile/resume/data";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const ResumeCV = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [resumes, setResumes] = useState(recentResumes);
  const [pendingUploads, setPendingUploads] = useState([]);
  const fileInputRef = useRef(null);

  const uploadResumesToBackend = async () => {
    if (pendingUploads.length === 0) return true;

    try {
      for (const fileData of pendingUploads) {
        const formData = {
          fileName: fileData.file.name, // Store only the filename
          email: email,
          isDefault: fileData.isDefault,
        };

        await axios.post(
          `${process.env.REACT_APP_API_URL}/onboarding/resumeUpload`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Clear pending uploads after successful submission
      setPendingUploads([]);
      return true;
    } catch (error) {
      console.error("Error uploading resumes:", error);
      return false;
    }
  };
  

  const addResumeToState = (file) => {
    const resumeId = Date.now(); // Generate a unique ID
    const isFirstResume = resumes.length === 0 && pendingUploads.length === 0;

    setPendingUploads((prev) => [
      ...prev,
      {
        id: resumeId,
        file,
        isDefault: isFirstResume,
      },
    ]);

    const newResume = {
      id: resumeId,
      fileName: file.name, // Store filename only
      fileSize: `${(file.size / 1024).toFixed(1)}KB`,
      uploadDate: new Date().toISOString().split("T")[0],
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f1dd8375a5af3296031fcefe3c6548e05df2b0f212157ea8dedaae6a5719d9ac",
      actionIconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/95fbd36175aa814b913df00b5649797f6bee7ca5ee3f7aa114fcae7934f1c7e8",
      isDefault: isFirstResume,
    };

    setResumes((prevResumes) => [newResume, ...prevResumes]);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size <= 50 * 1024 * 1024) {
      addResumeToState(uploadedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 50 * 1024 * 1024) {
      addResumeToState(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSetDefault = (id) => {
    setResumes((prevResumes) => {
      const updatedResumes = prevResumes.map((resume) => ({
        ...resume,
        isDefault: resume.id === id,
      }));

      const selectedResume = updatedResumes.find((resume) => resume.id === id);
      const otherResumes = updatedResumes.filter((resume) => resume.id !== id);

      setPendingUploads((prev) =>
        prev.map((upload) => ({
          ...upload,
          isDefault: upload.id === id,
        }))
      );

      return [selectedResume, ...otherResumes];
    });
  };

  const handleDelete = (id) => {
    setPendingUploads((prev) => prev.filter((upload) => upload.id !== id));

    setResumes((prevResumes) =>
      prevResumes.filter((resume) => resume.id !== id)
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSaveAndContinue = async () => {
    const uploadSuccess = await uploadResumesToBackend();
    if (uploadSuccess) {
      navigate("/onboarding/EducationDetails");
    }
  };

  return (
    <div className={styles.container}>
       <div className=" absolute top-5 left-3 md:left-10">
                <img src="/images/visafriendly.png" alt="visafriendly" className="h-10" />
            </div>
      <div className={styles.content}>
        <ProgressSteps steps={steps} currentPage={2} />
        <h1 className="text-3xl my-8 font-[600]">
          Upload your resume
        </h1>
        <main className={styles.uploadContainer}>
            <h1 className="text-sm font-[400] text-left"> <span className="font-[600]">Note :</span> We parse your resume to prefill your profile information and for job matching. We recommend using the PDF version of the resume for the best results.</h1>
          <section className={styles.uploadSection}>
            <div className={styles.recentUploads}>
              {resumes.map((resume) => (
                <ResumeItem
                  key={resume.id}
                  id={resume.id}
                  fileName={resume.fileName}
                  fileSize={resume.fileSize}
                  uploadDate={resume.uploadDate}
                  iconSrc={resume.iconSrc}
                  actionIconSrc={resume.actionIconSrc}
                  isDefault={resume.isDefault}
                  onDelete={handleDelete}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
            <div
              className={`${styles.dropZone} ${resumes.length > 2 ? styles.compressedDropZone : ""
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="region"
              aria-label="File upload area"
            >
              <img
                src="/images/cards.png"
                alt=""
                className={`${resumes.length < 2 ? styles.cards : styles.noImage
                  }`}
              />
              <input
                type="file"
                id="resumeUpload"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                aria-label="Upload resume file"
              />
              <label htmlFor="resumeUpload" className={styles.uploadLabel}>
                <Button variant="outline" onClick={triggerFileInput}>
                  Upload Resume
                </Button>
              </label>
              <p className={styles.maxSize}>PDF up to 5 MB</p>
            </div>
          </section>

          <div className={styles.divider} role="separator" />

          <section className={styles.actionButtons}>
            <Button
              variant="outline"
              onClick={() => navigate("/onboarding/ContactDetails")}
            >
              Back
            </Button>
            <button type="button" onClick={() => navigate("/onboarding/educationDetails")} style={{ background: 'none', border: 'none', color: '#313DEB', fontWeight: 500, fontSize: 16, marginRight: 16, cursor: 'pointer' }}>Skip this Step</button>
            
            <Button variant="primary" onClick={handleSaveAndContinue}>
              Save & Continue
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResumeCV;
