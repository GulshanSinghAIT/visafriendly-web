import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SettingsPage.module.css";
import { AccountDeletion } from "./AccountDeletion";
import { SettingsMenu } from "../sidebar/SettingsMenu.tsx";

const sidebarItems = [
  { id: "general", label: "General" },
  { id: "password", label: "Change Password" },
  { id: "pricing", label: "Pricing and Plans" },
  { id: "notifications", label: "Notifications" },
  { id: "delete", label: "Delete my account" },
];

export const DeletePage = () => {
  const [activeSection, setActiveSection] = useState("delete");
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
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbInactive}>Settings</span>
            <span className={styles.breadcrumbSeparator}> / </span>
            <span className={styles.breadcrumbActive}>Delete Account</span>
          </div>
          <p className={styles.pageDescription}>
            Permanently delete your account and all associated data
          </p>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          <AccountDeletion />
        </div>
      </main>
    </div>
  );
};
