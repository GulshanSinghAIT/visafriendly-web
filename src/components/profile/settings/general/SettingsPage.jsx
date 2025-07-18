// GeneralPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormInput } from "./FormInput";
import styles from "./SettingsPage.module.css";
import { SettingsMenu } from "../sidebar/SettingsMenu.tsx";
import { useUser } from "@clerk/clerk-react";

const sidebarItems = [
  { id: "general", label: "General" },
  { id: "password", label: "Change Password" },
  { id: "pricing", label: "Pricing and Plans" },
  { id: "notifications", label: "Notifications" },
  { id: "delete", label: "Delete my account" },
];

export const GeneralPage = () => {
  const { user } = useUser();
  const orgEmail = user?.emailAddresses[0]?.emailAddress;

  const [activeSection, setActiveSection] = useState("general");
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    username: "",
    profilePicture: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/settings/general`,
          { orgEmail: orgEmail }
        );
        const { firstName, lastName, email, username, profilePicture } =
          response.data;
        const data = {
          fullName: `${firstName} ${lastName}`,
          email,
          username,
          profilePicture,
        };
        setProfileData(data);
        setOriginalData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (orgEmail) {
      fetchUserData();
    }
  }, [orgEmail]);

  useEffect(() => {
    // Check if data has changed
    if (originalData) {
      const hasDataChanged = 
        profileData.fullName !== originalData.fullName ||
        profileData.email !== originalData.email ||
        profileData.username !== originalData.username ||
        selectedFile !== null;
      setHasChanges(hasDataChanged);
    }
  }, [profileData, selectedFile, originalData]);

  const handleSidebarClick = (item) => {
    setActiveSection(item.id);
    navigate(`/settings/${item.id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handlePictureUpload = async () => {
    if (!selectedFile) return false;

    try {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      formData.append("email", orgEmail);

      const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/settings/uploadProfilePicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.success) {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: response.data.profilePicture,
        }));
        setSelectedFile(null);
        setFileName("No file chosen");
        setUploadProgress(0);
        document.getElementById("profilePicture").value = "";
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadProgress(0);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // First update general info
      await axios.put(`${process.env.REACT_APP_API_URL}/settings/updateGeneral`, {
        fullName: profileData.fullName,
        email: profileData.email,
        username: profileData.username,
        orgEmail: orgEmail,
      });

      // Then handle profile picture upload if a file is selected
      if (selectedFile) {
        const uploadSuccess = await handlePictureUpload();
        if (!uploadSuccess) {
          throw new Error("Failed to upload profile picture");
        }
      }

      // Update original data to reflect saved state
      setOriginalData({
        ...profileData,
        profilePicture: selectedFile ? profileData.profilePicture : originalData.profilePicture,
      });
      setHasChanges(false);
      
      // Show success message
      showNotification("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating user data:", error);
      showNotification("Failed to save changes: " + (error.message || "Unknown error"), "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        setProfileData(originalData);
        setSelectedFile(null);
        setFileName("No file chosen");
        setHasChanges(false);
        document.getElementById("profilePicture").value = "";
      }
    } else {
      window.location.reload();
    }
  };

  const showNotification = (message, type) => {
    // Create a simple notification system
    const notification = document.createElement("div");
    notification.className = `${styles.notification} ${styles[type]}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add(styles.show);
    }, 100);

    setTimeout(() => {
      notification.classList.remove(styles.show);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.sidebar}>
          <SettingsMenu />
        </div>
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading your profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <SettingsMenu />
      </div>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbInactive}>
              Settings&nbsp;&nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span className={styles.breadcrumbActive}>
              {sidebarItems.find((item) => item.id === activeSection)?.label}
            </span>
          </div>
          <p className={styles.pageDescription}>
            Manage your profile information and account settings
          </p>
        </header>

        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <section className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Profile Picture</h2>
            <div className={styles.profilePictureContainer}>
              <div className={styles.avatarContainer}>
                {profileData.profilePicture ? (
                  <img
                    src={profileData.profilePicture}
                    alt="Profile"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg className={styles.avatarIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className={styles.uploadOverlay}>
                    <div className={styles.uploadProgress}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.uploadSection}>
                <div className={styles.buttonGroup}>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className={styles.uploadButton}
                    onClick={() =>
                      document.getElementById("profilePicture").click()
                    }
                    disabled={uploadProgress > 0}
                  >
                    {uploadProgress > 0 ? (
                      <>
                        <span className={styles.spinner}></span>
                        Uploading...
                      </>
                    ) : (
                      "Upload picture"
                    )}
                  </button>
                  {selectedFile && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => {
                        setSelectedFile(null);
                        setFileName("No file chosen");
                        document.getElementById("profilePicture").value = "";
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{fileName}</span>
                  {selectedFile && (
                    <span className={styles.fileSize}>
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </div>
                <p className={styles.uploadHint}>
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.formGrid}>
              <FormInput
                label="Full Name"
                value={profileData.fullName}
                placeholder="Enter your full name"
                id="fullName"
                onChange={handleInputChange}
              />
              <FormInput
                label="Email"
                value={profileData.email}
                placeholder="Enter your email"
                id="email"
                onChange={handleInputChange}
              />
              <FormInput
                label="Username"
                value={profileData.username}
                placeholder="Enter your username"
                id="username"
                onChange={handleInputChange}
              />
            </div>
          </section>

          
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
