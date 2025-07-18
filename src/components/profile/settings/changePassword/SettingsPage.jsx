import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { FormInput } from "./FormInput";
import styles from "./SettingsPage.module.css";
import { useClerk, useUser } from "@clerk/clerk-react";
import { SettingsMenu } from "../sidebar/SettingsMenu.tsx";

const sidebarItems = [
  { id: "general", label: "General" },
  { id: "password", label: "Change Password" },
  { id: "pricing", label: "Pricing and Plans" },
  { id: "notifications", label: "Notifications" },
  { id: "delete", label: "Delete my account" },
];

export const PasswordPage = () => {
  const { clerk } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const orgEmail = user?.emailAddresses[0]?.emailAddress;

  const [activeSection, setActiveSection] = useState("password");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveSection(path);
  }, [location]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("Include lowercase letter");
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("Include uppercase letter");
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("Include number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("Include special character");
    }

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear specific field error
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }

    // Check password strength for new password
    if (id === "newPassword") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Clear success state when user starts typing
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.newPassword = "Password is too weak";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await user.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/settings/updatePassword`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          email: orgEmail,
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        setPasswordStrength({ score: 0, feedback: [] });
        showNotification("Password updated successfully!", "success");
        
        // Auto-navigate after success
        setTimeout(() => {
          navigate("/settings/general");
        }, 2000);
      } else {
        setErrors({
          currentPassword: response.data.message || "Failed to update password",
        });
        showNotification(response.data.message || "Failed to update password", "error");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      const errorMessage = error.response?.data?.message || "An error occurred while updating password";
      setErrors({
        currentPassword: errorMessage,
      });
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSidebarClick = (item) => {
    navigate(`/settings/${item.id}`);
  };

  const showNotification = (message, type) => {
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return "#ef4444";
    if (passwordStrength.score <= 3) return "#f59e0b";
    if (passwordStrength.score <= 4) return "#10b981";
    return "#059669";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return "Weak";
    if (passwordStrength.score <= 3) return "Fair";
    if (passwordStrength.score <= 4) return "Good";
    return "Strong";
  };

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
              Change Password
            </span>
          </div>
          <p className={styles.pageDescription}>
            Update your password to keep your account secure
          </p>
        </header>

        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <section className={styles.passwordSection}>
            <h2 className={styles.sectionTitle}>Password Information</h2>
            
            <div className={styles.formGrid}>
              <FormInput
                label="Current Password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                type="password"
                placeholder="Enter your current password"
                error={errors.currentPassword}
                required
              />
              
              <FormInput
                label="New Password"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                type="password"
                error={errors.newPassword}
                required
              />

              {formData.newPassword && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div 
                      className={styles.strengthFill}
                      style={{ 
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <div className={styles.strengthInfo}>
                    <span 
                      className={styles.strengthText}
                      style={{ color: getPasswordStrengthColor() }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                    <span className={styles.strengthScore}>
                      {passwordStrength.score}/5
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div className={styles.strengthFeedback}>
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className={styles.feedbackItem}>
                          <span className={styles.feedbackIcon}>•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <FormInput
                label="Confirm New Password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                type="password"
                error={errors.confirmPassword}
                required
              />
            </div>

            {isSuccess && (
              <div className={styles.successMessage}>
                <svg className={styles.successIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Password updated successfully! Redirecting...
              </div>
            )}
          </section>

          <div className={styles.linkContainer}>
            <Link className={styles.forgotPassword} to="/forgotPassword">
              <svg className={styles.linkIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Forgot your password?
            </Link>
          </div>

          
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate("/settings/general")}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
