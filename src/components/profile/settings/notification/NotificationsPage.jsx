// NotificationsPage.jsx
import React, { useState, useEffect } from "react";
import NotificationSection from "./NotificationSection";
import styles from "./NotificationsPage.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const defaultNotificationData = {
  jobs: {
    title: "Jobs",
    items: [
      {
        title: "Job alerts and reminders",
        description:
          "Get notified about new job opportunities that match your profile and preferences.",
        enabled: true,
      },
      {
        title: "Job recommendations",
        description:
          "Receive personalized job recommendations based on your skills and experience.",
        enabled: true,
      },
    ],
  },
  newsletter: {
    title: "Newsletter",
    items: [
      {
        title: "VisaFriendly Newsletter",
        description:
          "Stay updated with the latest visa news, job market trends, and career tips.",
        enabled: true,
      },
    ],
  },
  announcements: {
    title: "Announcements",
    items: [
      {
        title: "Product Announcements",
        description:
          "Get notified about new features, updates, and improvements to our platform.",
        enabled: true,
      },
    ],
  },
};

const NotificationsPage = () => {
  const { user, isLoaded } = useUser();
  const [notificationData, setNotificationData] = useState(
    defaultNotificationData
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!isLoaded || !user) return;

      const email = user.emailAddresses[0]?.emailAddress;
      if (!email) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/settings/getNotifications/${email}`
        );

        if (response.data.success) {
          // Merge user preferences with default data
          const updatedData = { ...defaultNotificationData };

          response.data.preferences.forEach((pref) => {
            const section = updatedData[pref.type];
            if (section) {
              const item = section.items.find((i) => i.title === pref.title);
              if (item) {
                item.enabled = pref.enabled;
              }
            }
          });

          setNotificationData(updatedData);
        }
      } catch (error) {
        console.error("Failed to fetch notification preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPreferences();
  }, [user, isLoaded]);

  const handleToggleChange = (sectionTitle, itemTitle, enabled) => {
    setNotificationData(prev => ({
      ...prev,
      [sectionTitle.toLowerCase()]: {
        ...prev[sectionTitle.toLowerCase()],
        items: prev[sectionTitle.toLowerCase()].items.map(item =>
          item.title === itemTitle ? { ...item, enabled } : item
        )
      }
    }));
    setHasChanges(true);
  };

  const handleSaveAll = async () => {
    if (!hasChanges) return;

    setIsLoading(true);
    try {
      const email = user.emailAddresses[0]?.emailAddress;
      const preferences = [];

      Object.values(notificationData).forEach(section => {
        section.items.forEach(item => {
          preferences.push({
            type: section.title.toLowerCase(),
            title: item.title,
            enabled: item.enabled
          });
        });
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/settings/updateNotifications`, {
        email,
        preferences
      });

      setHasChanges(false);
      // Show success notification
      showNotification("Notification preferences saved successfully!", "success");
    } catch (error) {
      console.error("Failed to save notification preferences:", error);
      showNotification("Failed to save preferences. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
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

  if (!isLoaded || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading your notification preferences...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        {Object.values(notificationData).map((section) => (
          <NotificationSection
            key={section.title}
            title={section.title}
            items={section.items}
            onToggleChange={(itemTitle, enabled) => 
              handleToggleChange(section.title, itemTitle, enabled)
            }
          />
        ))}
        
        {hasChanges && (
          <div className={styles.saveSection}>
            <button 
              className={styles.saveButton}
              onClick={handleSaveAll}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                "Save All Changes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
