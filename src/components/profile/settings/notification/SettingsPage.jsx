import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SettingsPage.module.css";
import NotificationsPage from "./NotificationsPage";
import { SettingsMenu } from "../sidebar/SettingsMenu.tsx";

const sidebarItems = [
  { id: "general", label: "General" },
  { id: "password", label: "Change Password" },
  { id: "pricing", label: "Pricing and Plans" },
  { id: "notifications", label: "Notifications" },
  { id: "delete", label: "Delete my account" },
];

export const NotificationPage = () => {
  const [activeSection, setActiveSection] = useState("notifications");
  const navigate = useNavigate();

  const handleSidebarClick = (item) => {
    navigate(`/settings/${item.id}`);
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
              Notifications
            </span>
          </div>
          <p className={styles.pageDescription}>
            Manage your notification preferences and stay updated with what matters to you
          </p>
        </header>

        <NotificationsPage />
      </main>
    </div>
  );
};
