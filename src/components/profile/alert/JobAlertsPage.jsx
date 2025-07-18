import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./JobAlertsPage.module.css";
import JobAlertCard from "./JobAlertCard";
import JobPicksSection from "./JobPicksSection";
import AddExperienceForm from "./Form/form";
import { NavigationBar } from "../NavigationBar/Navigation";
import { useUser } from "@clerk/clerk-react";

const JobAlertsPage = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const [alerts, setAlerts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobAlerts = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getAlertCards`,
        { email }
      );
      setAlerts(response.data.jobAlerts || []);
    } catch (error) {
      console.error("Error fetching job alerts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchJobAlerts();
    }
  }, [email]);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/deleteAllAlerts`, {
        data: { email: email },
      });
      // Refresh the page to show updated state
      window.location.reload();
    } catch (error) {
      console.error("Error deleting all job alerts:", error);
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/deleteAlert/${id}`, {
        data: { email },
      });
      setAlerts(alerts.filter((alert) => alert.id !== id));
    } catch (error) {
      console.error("Error deleting job alert:", error);
    }
  };

  const handleUpdateAlert = (updatedAlert) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === updatedAlert.id ? updatedAlert : alert
      )
    );
  };

  const handleSaveNewAlert = (newAlert) => {
    setAlerts([...alerts, newAlert]);
    handleClosePopup();
  };

  return (
    <div className={styles.profileContainer}>
      <NavigationBar />
      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>Manage Job Alerts</h1>
            <button
              className={styles.deleteAllButton}
              onClick={handleDeleteAll}
              aria-label="Delete all job alerts"
            >
              Delete all
            </button>
          </header>

          <section className={styles.alertsList} aria-label="Job alerts list">
            {isLoading ? (
              <p className={styles.loading}>Loading job alerts...</p>
            ) : alerts.length > 0 ? (
              alerts.map((alert) => (
                <JobAlertCard
                  key={alert.id}
                  alert={{
                    id: alert.id,
                    title: Array.isArray(alert.keywords)
                      ? alert.keywords.join(", ")
                      : alert.keywords || "No keywords",
                    location: alert.location || "Any location",
                    frequency: `Frequency: ${
                      alert.frequency || "Daily"
                    } via email and Notification`,
                    companyLogo: "/images/suitcase.png",
                  }}
                  onDelete={() => handleDeleteAlert(alert.id)}
                  onUpdate={handleUpdateAlert}
                />
              ))
            ) : (
              <p className={styles.noAlerts}>No job alerts found.</p>
            )}
          </section>

          <JobPicksSection />

          <button
            className={styles.createAlertButton}
            onClick={handleOpenPopup}
            aria-label="Create Job alert"
          >
            <img src="/images/plus.png" className={styles.plus} alt="Plus" />
            Create Job Alert
          </button>

          {showPopup && (
            <AddExperienceForm
              onClose={handleClosePopup}
              onSave={handleSaveNewAlert}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default JobAlertsPage;
